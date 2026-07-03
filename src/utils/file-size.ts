import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

export class FileSize {
	private static toLocalFilePath(urlPath: string): string | null {
		if (!urlPath.startsWith('/')) return null;
		const safePath = urlPath.replace(/^\/+/, '');
		return path.join(process.cwd(), 'public', safePath);
	}

	private static format(bytes: number): string {
		const kb = bytes / 1024;
		if (kb < 1024) return `${kb.toFixed(1)} KB`;
		const mb = kb / 1024;
		return `${mb.toFixed(2)} MB`;
	}

	static getFromPublicHref(href: string): string {
		const localPath = FileSize.toLocalFilePath(href);
		if (!localPath || !existsSync(localPath)) return 'Tamaño no disponible';

		const stats = statSync(localPath);
		if (!stats.isFile()) return 'Tamaño no disponible';

		return FileSize.format(stats.size);
	}
}
