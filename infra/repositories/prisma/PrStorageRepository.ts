import { StorageRepository } from "@/domain/repositories/StorageRepository";
import { promises as fs } from "fs";
import path from "path";

export class PrStorageRepository implements StorageRepository {
	async save(file: File): Promise<string> {
		// 유효성 검사하기
		if (!file) {
			throw new Error("파일이 제공되지 않았습니다.");
		}

		if (!(file instanceof File)) {
			throw new Error("이미지 파일이 유효하지 않습니다.");
		}

		// 저장할 디렉토리 경로 설정하기
		const imageDir = path.join(process.cwd(), "public", "image", "product");

		// 파일명 중복을 피하기 위해 파일명 생성하기
		const fileExt = path.extname(file.name);
		const fileName = path.basename(file.name, fileExt);
		let fullName = file.name;
		let counter = 1;

		// 파일명이 중복될 경우 일련번호 붙이기
		while (
			await fs
				.access(path.join(imageDir, fullName))
				.then(() => true)
				.catch(() => false)
		) {
			fullName = `${fileName}(${counter})${fileExt}`;
			counter++;
		}

		const filePath = path.join(imageDir, fullName);
		await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

		// 저장된 파일 경로 반환
		return `/public/image/product/${fullName}`;
	}
}
