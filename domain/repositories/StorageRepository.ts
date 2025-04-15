export interface StorageRepository {
	save(file: File): Promise<string>;
}
