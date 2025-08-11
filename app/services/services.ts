const url = "http://154.53.63.54:8250";
const headers = { "Content-Type": "application/json" };

export interface RequestError {
  errorMsg: string;
}

export interface Greetings {
  chat_id: string;
  greetings: string;
}

export interface Message {
  ai_message: string;
  draft: string;
}

export async function firstLoad(): Promise<Greetings | RequestError> {
  const path = "/new-chat";

  try {
    const resp = await fetch(url + path, { method: "GET", headers });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data: Greetings = (await resp.json()) as Greetings;

    if (!data.chat_id) {
      throw new Error("Missing chatId.");
    } else if (!data.greetings) {
      throw new Error("Missing greetings.");
    }

    return data;
  } catch (error) {
    console.error(error);
    return { errorMsg: error } as RequestError;
  }
}

export async function sendMessage(
  chat_id: string,
  message: string
): Promise<Message | RequestError> {
  const path = "/chat/text";
  const body = JSON.stringify({
    chat_id,
    message,
  });

  try {
    const resp = await fetch(url + path, { method: "POST", headers, body });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = (await resp.json()) as Message;

    if (!data.ai_message) {
      throw new Error("Missing ai_message.");
    }

    return data;
  } catch (error) {
    console.error(error);
    return { errorMsg: error } as RequestError;
  }
}
