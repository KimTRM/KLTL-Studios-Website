export function splitIntoParagraphs(text: string): string[] {
    if (!text) return [];

    const explicitBreaks = text
        .split(/\n\n+|\|\|/)
        .map((segment) => segment.trim())
        .filter(Boolean);

    if (explicitBreaks.length > 1) {
        return explicitBreaks;
    }

    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

    if (sentences.length <= 2) {
        return [text.trim()];
    }

    const grouped: string[] = [];
    for (let i = 0; i < sentences.length; i += 2) {
        grouped.push(sentences.slice(i, i + 2).join(" "));
    }
    return grouped;
}

export function inferCurrentFocus(text: string): string {
    const normalized = text.trim();
    if (!normalized) {
        return "Building thoughtful digital experiences where code, story, and design feel inseparable.";
    }

    const sentences = normalized
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

    if (sentences.length <= 1) {
        return normalized;
    }

    return sentences[sentences.length - 1];
}
