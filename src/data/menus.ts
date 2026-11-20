import { SITE_URLS } from './site';

export type MenuIconName =
	| "award"
	| "archive"
	| "map"
	| "building"
	| "user"
	| "folder-open"
	| "clipboard-pen"
	| "tree-deciduous"
	| "user-round-check"
	| "eye"
	| "landmark"
	| "heart"
	| "phone-call"
	| "mail"
	| "thumbs-up"
	| "youtube"
	| "whatsapp";

export type MenuItem = {
	href: string;
	title: string;
	description?: string;
	icon: MenuIconName;
	external?: boolean;
};

export type MenuSection = {
	id: string;
	title: string;
	items: MenuItem[];
};

export const menus: MenuSection[] = [
	{
		id: "transparencia",
		title: "Transparencia",
		items: [
			{
				href: "/transparencia/actas",
				title: "Actas Municipales",
				description: "Registros públicos de sesiones municipales",
				icon: "award",
			},
			{
				href: "/transparencia/planes",
				title: "Planes de Gobierno",
				description: "Planes de la administración actual",
				icon: "map",
			},
			{
				href: "/transparencia/licitaciones",
				title: "Licitaciones",
				description: "Concursos públicos para empresas",
				icon: "building",
			},
			{
				href: "/transparencia/concursos",
				title: "Concursos",
				description: "Concursos públicos para particulares",
				icon: "user",
			},
			{
				href: "/archivo",
				title: "Archivo",
				description: "Todos los documentos publicados",
				icon: "archive",
			},
			{
				href: SITE_URLS.expediente,
				title: "Expediente",
				description: "Compras públicas en SICOP, el sistema de compras del Estado",
				icon: "folder-open",
				external: true,
			},
		],
	},
	{
		id: "gestion",
		title: "Gestión",
		items: [
			{
				href: "/gestion/formularios/",
				title: "Formularios",
				description: "Trámites y solicitudes para la ciudadanía.",
				icon: "clipboard-pen",
			},
			{
				href: "/gestion/ambiental/",
				title: "Gestión Ambiental",
				description: "Iniciativas, reportes y acciones ambientales.",
				icon: "tree-deciduous",
			},
			{
				href: "/gestion/desarrollo-humano/",
				title: "Desarrollo Humano",
				description: "Programas sociales y atención comunitaria.",
				icon: "user-round-check",
			},
		],
	},
	{
		id: "nosotros",
		title: "Nosotros",
		items: [
			{ href: "/nosotros/", title: "Misión y Visión", icon: "eye" },
			{ href: "/nosotros/historia", title: "Historia", icon: "landmark" },
			{ href: "/nosotros/cantonato", title: "Cantonato", icon: "heart" },
			{ href: "/donde-queda-tucurrique/", title: "¿Dónde queda Tucurrique?", icon: "map" },
		],
	},
	{
		id: "redes",
		title: "Redes y correo",
		items: [
			{
				href: SITE_URLS.correo,
				title: "Correo institucional",
				icon: "mail",
				external: true,
			},
			{
				href: SITE_URLS.facebook,
				title: "Facebook",
				icon: "thumbs-up",
				external: true,
			},
			{
				href: SITE_URLS.youtube,
				title: "YouTube",
				icon: "youtube",
				external: true,
			},
			{
				href: SITE_URLS.whatsapp,
				title: "WhatsApp",
				icon: "whatsapp",
				external: true,
			},
		],
	},
];

/** Enlaces directos de primer nivel en la barra de navegación. */
export const primaryLinks = {
	actas: { href: "/transparencia/actas", title: "Actas" },
	contacto: { href: "/contacto/", title: "Contacto" },
} as const;

/** Secciones que aparecen como menús desplegables en escritorio. */
export const desktopMenuIds = ["transparencia", "gestion", "nosotros"];

const trimSlash = (value: string) => value.replace(/\/+$/, "") || "/";

/** Indica si `href` corresponde a la página actual o a una de sus subpáginas. */
export const isCurrentPath = (href: string, pathname: string) => {
	if (/^https?:/.test(href)) return false;
	const target = trimSlash(href);
	const current = trimSlash(pathname);
	return target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`);
};
