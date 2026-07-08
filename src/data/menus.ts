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
	| "mail";

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
				href: "https://www.sicop.go.cr/moduloPcont/expedientesElectronicos.jsp?code=5b50159fd3121462b1c225df56cb576a6748d82660198ce2b542b60b71b14f7a636262775d3921e40ed145a357ca401ec7c84d3b3379023e6a103591d5d8cba7304f5a798bb8a68273d8228cbf092c0f7645687eabc5552a56bb2bad877b489494e1a891333eb56bcc0a371d12ac94987580b427cae622234462e448186da624",
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
				href: "https://cloud.umami.is/analytics/eu/share/XDt82GVFDkyVKTP2?date=30day&country=eq.CR",
				title: "Estadísticas",
				icon: "globe-check",
				external: true,
			},
			{
				href: "https://www.spacemail.com/es-ES/login/",
				title: "Correo",
				icon: "mail",
				external: true,
			},
		],
	},
];
