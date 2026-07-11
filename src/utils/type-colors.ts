export type TypeVariant = {
	label: string;
	badge: string;
	callout: string;
	calloutIcon: string;
};

export const typeVariants: Record<string, TypeVariant> = {
	ordinaria: {
		label: 'Ordinaria',
		badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
		callout: 'border-emerald-500 bg-emerald-50',
		calloutIcon: 'text-emerald-500',
	},
	extraordinaria: {
		label: 'Extraordinaria',
		badge: 'bg-amber-50 text-amber-700 ring-amber-200',
		callout: 'border-amber-500 bg-amber-50',
		calloutIcon: 'text-amber-500',
	},
	concurso: {
		label: 'Concurso',
		badge: 'bg-blue-50 text-blue-700 ring-blue-200',
		callout: 'border-blue-500 bg-blue-50',
		calloutIcon: 'text-blue-500',
	},
	licitacion: {
		label: 'Licitación',
		badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
		callout: 'border-indigo-500 bg-indigo-50',
		calloutIcon: 'text-indigo-500',
	},
};

const fallback: TypeVariant = {
	label: 'General',
	badge: 'bg-slate-100 text-slate-700 ring-slate-200',
	callout: 'border-slate-500 bg-slate-50',
	calloutIcon: 'text-slate-500',
};

export const normalizeType = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');

export const getTypeVariant = (type?: string): TypeVariant & { label: string } => {
	if (!type) return fallback;
	const key = normalizeType(type);
	return typeVariants[key] ?? { ...fallback, label: type };
};
