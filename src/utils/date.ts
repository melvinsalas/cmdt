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

// ISO YYYY-MM-DD values are split directly to avoid timezone shifts; other values use UTC parts.
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

	const day = String(Number(parts.day));
	const monthName = monthNamesLong[parts.monthIndex];
	if (monthName) {
		return `${day} de ${monthName} de ${parts.year}`;
	}
	return `${day} de ${String(parts.monthIndex + 1).padStart(2, '0')} de ${parts.year}`;
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

/** Fecha corta legible: "17 nov. 2026". */
export function formatDateEsCompact(value: string | Date): string {
	const parts = parseDateParts(value);
	if (parts.monthIndex < 0) {
		return parts.rawValue;
	}

	const monthName = monthNamesShort[parts.monthIndex];
	return `${Number(parts.day)} ${monthName ?? parts.monthIndex + 1}. ${parts.year}`;
}

/** Nombre del mes con mayúscula inicial: "Noviembre". */
export function monthNameEs(monthIndex: number): string {
	const name = monthNamesLong[monthIndex] ?? '';
	return name.charAt(0).toUpperCase() + name.slice(1);
}
