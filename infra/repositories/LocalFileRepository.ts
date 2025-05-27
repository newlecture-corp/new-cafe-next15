import { FileRepository } from "@/domain/repositories/FileRepository";
import { promises as fs } from "fs";
import * as path from "path";

export class LocalFileRepository implements FileRepository {
	// 사전설정 : 이미지 파일을 저장할 기본 디렉토리(/image/product)
	private readonly baseDir: string;

	constructor(baseDir?: string) {
		this.baseDir =
			baseDir ?? path.resolve(process.cwd(), "public", "image", "product");
	}

	async save(file: File): Promise<string> {
		// 1. 디렉토리가 존재하지 않으면 디렉토리를 생성해주고
		await fs.mkdir(this.baseDir, { recursive: true });

		// 3. 원본 파일명과 확장자 추출해서
		const originalName = file.name;
		const ext = path.extname(originalName);
		const baseName = path.basename(originalName, ext);

		// 4. 저장할 고유한 파일명 생성한 후
		let filename = originalName;
		let counter = 1;
		while (await this.fileExists(filename)) {
			filename = `${baseName}(${counter})${ext}`;
			counter++;
		}

		// 5. 파일 데이터를 읽어서
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// 6. 파일을 저장한다.
		const filePath = path.join(this.baseDir, filename);
		await fs.writeFile(filePath, buffer);

		// 확인용 log 출력
		// console.log("=== LocalFileRepository.save ===");
		// console.log(`File saved: ${filePath}`);
		// console.log("===========================");

		// 7. 마지막으로 저장한 파일명을 반환한다.
		return filename;
	}

	private async fileExists(filename: string): Promise<boolean> {
		try {
			await fs.access(path.join(this.baseDir, filename));
			return true;
		} catch {
			return false;
		}
	}
}
