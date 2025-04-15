import { StorageRepository } from "@/domain/repositories/StorageRepository";
import { createClient } from "@/utils/supabase/server";

export class SbStorageRepository implements StorageRepository {
	async save(file: File): Promise<string> {
		const supabase = await createClient();

		const bucketName = "image";
		const folderPath = "product";
		let fileName = file.name;
		let filePath = `${folderPath}/${fileName}`;
		let counter = 1;

		// Check if a file with the same name already exists
		while (true) {
			const { data, error } = await supabase.storage
				.from(bucketName)
				.list(folderPath, { search: fileName });

			if (error)
				throw new Error(`Error checking file existence: ${error.message}`);

			if (
				data &&
				data.some((item: { name: string }) => item.name === fileName)
			) {
				// File exists, append a counter to the filename
				const [name, extension] = fileName.split(/\.(?=[^\.]+$)/);
				fileName = `${name}-${counter}.${extension}`;
				filePath = `${folderPath}/${fileName}`;
				counter++;
			} else {
				break;
			}
		}

		// Upload the file
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from(bucketName)
			.upload(filePath, file);

		if (uploadError) {
			throw new Error(`Failed to upload file: ${uploadError.message}`);
		}

		return uploadData?.path || "";
	}
}
