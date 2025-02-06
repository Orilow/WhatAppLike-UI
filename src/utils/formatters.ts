
/** 
 * Форматирует любой номер телефона в формат вотсапа
 * например, +7 (950) 111-22-33 -> 79501112233
 */
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("+")) {
        return cleaned.slice(1);
    }

    return cleaned;
};

/** 
 * Делает красивый номер для отображения
 * например, 79501112233 -> +7 (950) 111-22-33
 */
export const displayPhoneNumber = (phone: string): string => {
    const cleaned = formatPhoneNumber(phone);
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
};