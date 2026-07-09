import { SITE_URLS } from './site';

export type MenuIconName =
	| "award"
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
	| "cookie"
	| "globe-check"
	| "mail"
	| "thumbs-up";

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
				href: SITE_URLS.expediente,
				title: "Expediente",
				description: "Expediente electrónico en SICOP",
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
		],
	},
	{
		id: "mas",
		title: "Más",
		items: [
			{ href: "/contacto/", title: "Contacto", icon: "phone-call" },
			{ href: "/privacidad", title: "Privacidad", icon: "cookie" },
			{
				href: SITE_URLS.estadisticas,
				title: "Estadísticas",
				icon: "globe-check",
				external: true,
			},
			{
				href: SITE_URLS.correo,
				title: "Correo",
				icon: "mail",
				external: true,
			},
			{
				href: SITE_URLS.facebook,
				title: "Facebook",
				icon: "thumbs-up",
				external: true,
			},
		],
	},
];
