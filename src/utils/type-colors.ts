export type TypeVariant = {
	label: string;
	badge: string;
	callout: string;
	calloutIcon: string;
};

export const typeVariants: Record<string, TypeVariant> = {
	ordinaria: {
		label: 'Sesión Ordinaria',
		badge: 'bg-brand-50 text-brand-800 ring-brand-200',
		callout: 'border-brand-200 bg-brand-50 hover:border-brand-300',
		calloutIcon: 'text-brand-600',
	},
	extraordinaria: {
		label: 'Sesión Extraordinaria',
		badge: 'bg-gold-100 text-gold-800 ring-gold-300',
		callout: 'border-gold-300 bg-gold-100 hover:border-gold-400',
		calloutIcon: 'text-gold-800',
	},
	concurso: {
		label: 'Concurso',
		badge: 'bg-blue-50 text-blue-700 ring-blue-200',
		callout: 'border-blue-200 bg-blue-50 hover:border-blue-300',
		calloutIcon: 'text-blue-600',
	},
	licitacion: {
		label: 'Licitación',
		badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
		callout: 'border-indigo-200 bg-indigo-50 hover:border-indigo-300',
		calloutIcon: 'text-indigo-600',
	},
	plan: {
		label: 'Plan de Gobierno',
		badge: 'bg-violet-50 text-violet-700 ring-violet-200',
		callout: 'border-violet-200 bg-violet-50 hover:border-violet-300',
		calloutIcon: 'text-violet-600',
	},
	orden: {
		label: 'Orden del Día',
		badge: 'bg-orange-50 text-orange-700 ring-orange-200',
		callout: 'border-orange-200 bg-orange-50 hover:border-orange-300',
		calloutIcon: 'text-orange-600',
	},
};

const fallback: TypeVariant = {
	label: 'General',
	badge: 'bg-slate-100 text-slate-700 ring-slate-200',
	callout: 'border-slate-200 bg-slate-50 hover:border-slate-300',
	calloutIcon: 'text-slate-600',
};

export const normalizeType = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');

export const getTypeVariant = (type?: string): TypeVariant & { label: string } => {
	if (!type) return fallback;
	const key = normalizeType(type);
	return typeVariants[key] ?? { ...fallback, label: type };
};
