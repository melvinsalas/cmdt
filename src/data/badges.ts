import { CalendarCheckIcon, FileQuestionMarkIcon, YoutubeIcon } from '@hugeicons/core-free-icons';
import type { IconSvgObject } from '@hugeicons/core-free-icons/types';

export type BadgeKey = 'video' | 'orden' | 'missing';

export type BadgeDefinition = {
	key: BadgeKey;
	icon: IconSvgObject;
	/** Texto corto que se muestra junto al ícono. */
	label: string;
	/** Clases del chip con texto visible. */
	chip: string;
};

export const badgeDefinitions: Record<BadgeKey, BadgeDefinition> = {
	video: {
		key: 'video',
		icon: YoutubeIcon,
		label: 'Video',
		chip: 'border-slate-300 bg-white text-slate-700',
	},
	orden: {
		key: 'orden',
		icon: CalendarCheckIcon,
		label: 'Orden del día',
		chip: 'border-slate-300 bg-white text-slate-700',
	},
	missing: {
		key: 'missing',
		icon: FileQuestionMarkIcon,
		label: 'Acta pendiente',
		chip: 'border-wine-700/30 bg-red-50 text-wine-800',
	},
};

export const resolveBadges = (badges: string[] = []): BadgeDefinition[] =>
	badges.flatMap((badge) => {
		const definition = badgeDefinitions[badge as BadgeKey];
		return definition ? [definition] : [];
	});
