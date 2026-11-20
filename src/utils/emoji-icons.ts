import {
	ArchiveIcon,
	BankIcon,
	Book01Icon,
	Book02Icon,
	Briefcase01Icon,
	Building02Icon,
	Call02Icon,
	ComputerIcon,
	Edit02Icon,
	Hospital01Icon,
	LibraryIcon,
	Location01Icon,
	LockIcon,
	Mail01Icon,
	MedicalMaskIcon,
	Note01Icon,
	Search01Icon,
	StarIcon,
	Tree01Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgObject } from '@hugeicons/core-free-icons/types';

/**
 * El contenido sigue usando `emoji:` en el frontmatter y en <Button>, pero la
 * interfaz dibuja un ícono de una sola familia (Hugeicons) en su lugar.
 * Los emojis sin equivalente no se muestran.
 */
const emojiIcons: Record<string, IconSvgObject> = {
	'🏛': BankIcon,
	'☎': Call02Icon,
	'🧑‍💼': Briefcase01Icon,
	'🦺': MedicalMaskIcon,
	'🦠': MedicalMaskIcon,
	'🗄': ArchiveIcon,
	'🖥': ComputerIcon,
	'🔒': LockIcon,
	'📨': Mail01Icon,
	'📝': Note01Icon,
	'📚': LibraryIcon,
	'📘': Book01Icon,
	'📗': Book02Icon,
	'📍': Location01Icon,
	'🏥': Hospital01Icon,
	'🏢': Building02Icon,
	'🌳': Tree01Icon,
	'⭐': StarIcon,
	'✍': Edit02Icon,
	'🔍': Search01Icon,
};

// Quita selectores de variación (FE0F) y modificadores de tono de piel.
const normalizeEmoji = (value: string) =>
	value.replace(/[︎️]/g, '').replace(/\p{Emoji_Modifier}/gu, '').trim();

export const iconForEmoji = (emoji?: string): IconSvgObject | undefined =>
	emoji ? emojiIcons[normalizeEmoji(emoji)] : undefined;
