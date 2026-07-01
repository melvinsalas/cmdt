export function formatDateEs(value: string | Date): string {
	// ponytail: ISO YYYY-MM-DD is rendered via split to avoid timezone shifts; fallback uses UTC formatter.
	const monthNames = [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre',
	] as const;

	const rawValue = value instanceof Date ? value.toISOString() : String(value).trim();
	const isoCandidate = rawValue.split('T')[0];

	const isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;
	const match = isoCandidate.match(isoDateOnly);
	if (match) {
		const [, year, month, day] = match;
		const monthIndex = Number(month) - 1;
		const monthName = monthNames[monthIndex];
		if (monthName) {
			return `${day} de ${monthName} de ${year}`;
		}
		return `${day} de ${month} de ${year}`;
	}

	const parsed = new Date(rawValue);
	if (Number.isNaN(parsed.getTime())) {
		return rawValue;
	}

	const day = String(parsed.getUTCDate()).padStart(2, '0');
	const month = monthNames[parsed.getUTCMonth()];
	const year = String(parsed.getUTCFullYear());
	return `${day}.${month}.${year}`;
}
