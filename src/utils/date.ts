const monthNamesLong = [
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

const monthNamesShort = [
	// ponytail: ISO YYYY-MM-DD is rendered via split to avoid timezone shifts; fallback uses UTC formatter.
	'ene',
	'feb',
	'mar',
	'abr',
	'may',
	'jun',
	'jul',
	'ago',
	'sep',
	'oct',
	'nov',
	'dic',
] as const;

function parseDateParts(value: string | Date) {
	const rawValue = value instanceof Date ? value.toISOString() : String(value).trim();
	const isoCandidate = rawValue.split('T')[0];

	const isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;
	const match = isoCandidate.match(isoDateOnly);
	if (match) {
		const [, year, month, day] = match;
		return {
			day,
			monthIndex: Number(month) - 1,
			year,
			rawValue,
		};
	}

	const parsed = new Date(rawValue);
	if (Number.isNaN(parsed.getTime())) {
		return {
			day: '',
			monthIndex: -1,
			year: '',
			rawValue,
		};
	}

	return {
		day: String(parsed.getUTCDate()).padStart(2, '0'),
		monthIndex: parsed.getUTCMonth(),
		year: String(parsed.getUTCFullYear()),
		rawValue,
	};
}

export function formatDateEs(value: string | Date): string {
	const parts = parseDateParts(value);
	if (parts.monthIndex < 0) {
		return parts.rawValue;
	}

	const monthName = monthNamesLong[parts.monthIndex];
	if (monthName) {
		return `${parts.day} de ${monthName} de ${parts.year}`;
	}
	return `${parts.day} de ${String(parts.monthIndex + 1).padStart(2, '0')} de ${parts.year}`;
}

export function formatDateEsShort(value: string | Date): string {
	const parts = parseDateParts(value);
	if (parts.monthIndex < 0) {
		return parts.rawValue;
	}

	const monthName = monthNamesShort[parts.monthIndex];
	const yearShort = parts.year.slice(-2);
	if (monthName) {
		return `${parts.day}/${monthName}/${yearShort}`;
	}
	return `${parts.day}/${String(parts.monthIndex + 1).padStart(2, '0')}/${yearShort}`;
}
