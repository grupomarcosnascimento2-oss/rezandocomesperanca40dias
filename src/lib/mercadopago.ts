// Rotas de backend para pagamento via Pix (Mercado Pago).
// O Access Token nunca é exposto ao cliente: fica apenas em process.env,
// configurado como variável de ambiente no servidor (Vercel), nunca no código.

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzN7QKoNsyFptGCAg2QN1BMJayCKyZofTbngOPU9kQdl0YTeGeQOI6pUcWoHdMUqDs/exec";
const PRICE = 29.9;
const DESCRIPTION = "40 Dias Rezando com Marcos Nascimento";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function notifySheet(payload: Record<string, unknown>) {
  fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("Erro ao enviar dados para a planilha:", err));
}

export async function handleCreatePix(request: Request): Promise<Response> {
  if (!MP_ACCESS_TOKEN) {
    console.error("MP_ACCESS_TOKEN não configurado no ambiente do servidor");
    return json({ error: "Pagamento indisponível no momento. Tente novamente mais tarde." }, 500);
  }

  let body: { nome?: string; whatsapp?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requisição inválida" }, 400);
  }

  const nome = (body.nome ?? "").trim();
  const whatsapp = (body.whatsapp ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!nome || !whatsapp || !email) {
    return json({ error: "Nome, WhatsApp e e-mail são obrigatórios" }, 400);
  }

  const [firstName, ...rest] = nome.split(" ");
  const lastName = rest.join(" ") || firstName;

  try {
    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "x-idempotency-key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        transaction_amount: PRICE,
        description: DESCRIPTION,
        payment_method_id: "pix",
        payer: { email, first_name: firstName, last_name: lastName },
      }),
    });

    const mpData = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error("Erro Mercado Pago (create):", mpData);
      const reason =
        mpData?.cause?.[0]?.description ?? mpData?.message ?? "motivo não informado";
      return json({ error: `Não foi possível gerar o Pix (${reason})` }, 502);
    }

    const qrCode: string | undefined = mpData?.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64: string | undefined =
      mpData?.point_of_interaction?.transaction_data?.qr_code_base64;

    notifySheet({
      nome,
      whatsapp,
      email,
      payment_id: mpData.id,
    });

    return json({
      paymentId: mpData.id,
      qrCode,
      qrCodeBase64,
      status: mpData.status,
    });
  } catch (error) {
    console.error("Erro ao criar Pix:", error);
    return json({ error: "Erro inesperado ao gerar o Pix. Tente novamente." }, 500);
  }
}

export async function handlePixStatus(request: Request): Promise<Response> {
  if (!MP_ACCESS_TOKEN) {
    return json({ error: "Serviço indisponível" }, 500);
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return json({ error: "Parâmetro id é obrigatório" }, 400);
  }

  try {
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    const mpData = await mpResponse.json();
    if (!mpResponse.ok) {
      return json({ error: "Pagamento não encontrado" }, 404);
    }
    return json({ status: mpData.status });
  } catch (error) {
    console.error("Erro ao consultar status do Pix:", error);
    return json({ error: "Erro inesperado ao consultar status" }, 500);
  }
}

export async function handleMpWebhook(request: Request): Promise<Response> {
  // Sempre responde 200 rapidamente para o Mercado Pago não reenviar em loop,
  // mesmo se algo abaixo falhar — os erros só vão para o log do servidor.
  if (!MP_ACCESS_TOKEN) {
    return json({ received: true });
  }

  try {
    const url = new URL(request.url);
    const rawBody = await request.text();
    let parsedBody: { data?: { id?: string }; id?: string } = {};
    try {
      parsedBody = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      // corpo pode vir vazio em alguns tipos de notificação — ignora
    }

    const paymentId =
      url.searchParams.get("data.id") ?? parsedBody?.data?.id ?? parsedBody?.id ?? null;

    if (!paymentId) {
      return json({ received: true });
    }

    // Nunca confia no payload da notificação: sempre confirma direto na API.
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    const mpData = await mpResponse.json();

    if (mpResponse.ok && mpData.status === "approved") {
      const nome = `${mpData?.payer?.first_name ?? ""} ${mpData?.payer?.last_name ?? ""}`.trim();
      notifySheet({
        action: "pagamento_confirmado",
        nome,
        whatsapp: "",
        email: mpData?.payer?.email ?? "",
        payment_id: paymentId,
      });
    }

    return json({ received: true });
  } catch (error) {
    console.error("Erro no webhook do Mercado Pago:", error);
    return json({ received: true });
  }
}
