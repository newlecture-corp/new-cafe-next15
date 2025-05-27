export interface FileRepository {
	save(file: File): Promise<string>;
}
