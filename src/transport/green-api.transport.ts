
const GreenApiUrl = import.meta.env.VITE_GREEN_API_URL;


export type SendMessageResponse = {
    idMessage: string;
};

export type TNotification = TTextNotification | TInstanceNotification | null;

export type TTextNotification = {
    receiptId: number;
    body: {
        typeWebhook: 'incomingMessageReceived';
        senderData: {
            chatId: string;
            sender: string;
        };
        messageData: {
            typeMessage: string;
            textMessageData: {
                textMessage: string;
            };
        };
    };
};

type TInstanceNotification = {
    receiptId: number;
    body: {
        typeWebhook: "outgoingMessageStatus" | "stateInstanceChanged";
    };
};


export class GreenApiService {
    private idInstance: string;
    private apiTokenInstance: string;

    constructor(idInstance: string, apiTokenInstance: string) {
        this.idInstance = idInstance;
        this.apiTokenInstance = apiTokenInstance;
    }

    /**
     * Отправка текстового сообщения.
     * @param chatId — номер получателя в формате, который требует API (например, "79111234567@c.us")
     * @param message — текст сообщения
     */
    async sendMessage(chatId: string, message: string): Promise<SendMessageResponse> {
        const url = `${GreenApiUrl}/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`;
        const payload = {
            chatId,
            message,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка отправки сообщения: ${errorText}`);
        }

        return await response.json();
    }

    /**
     * Получение уведомления (нового сообщения).
     * 
     * https://green-api.com/docs/api/receiving/technology-http-api/ReceiveNotification/
     */
    async receiveNotification(abortController?: AbortController): Promise<TNotification> {
        const url = `${GreenApiUrl}/waInstance${this.idInstance}/receiveNotification/${this.apiTokenInstance}`;

        const response = await fetch(url, {
            method: "GET",
            signal: abortController?.signal,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка получения уведомления: ${errorText}`);
        }

        return await response.json();
    }

    /**
     * Удаление полученного уведомления (рекомендуется удалять уведомление после обработки).
     * @param receiptId идентификатор уведомления, полученный из ответа receiveNotification.
     * 
     * https://green-api.com/docs/api/receiving/technology-http-api/DeleteNotification/
     */
    async deleteNotification(receiptId: number): Promise<void> {
        const url = `${GreenApiUrl}/waInstance${this.idInstance}/deleteNotification/${this.apiTokenInstance}/${receiptId}`;

        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка удаления уведомления: ${errorText}`);
        }

        return await response.json();
    }
}
