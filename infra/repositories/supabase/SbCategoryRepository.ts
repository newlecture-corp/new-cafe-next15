import { Category } from '@/domain/entities/Category';
import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { createClient } from '@/utils/supabase/server';

export class SbCategoryRepository implements CategoryRepository {

    async findAll(): Promise<Category[]> {
        const supabase = await createClient();

        const { data, error } = await supabase
                                .from('category')
                                .select('*');

        if (error) {
            throw new Error(`Failed to fetch categories: ${error.message}`);
        }

        return data as Category[];
    }
}
