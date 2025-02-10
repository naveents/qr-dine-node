
import { Document, FilterQuery, Model } from "mongoose";

export interface QueryResult <T>{
    data: T[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}


const paginate = async <T extends Document>(
    model: Model<T>, 
    filter: FilterQuery<T>, 
    page: number = 1, 
    limit: number = 50,
    excludeFields: string[] = ["__v"]
): Promise<QueryResult<T>> => {
    const skip = (page - 1) * limit;
    
    const totalResults = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / limit);

    //["__v", "field"]
    const projection = excludeFields.reduce( (acc, field) =>
        {
            acc[field] = 0;
            return acc;
        },
        {} as Record<string, 0>
    );
    
    const data = await model.find(filter)
        .select(projection)
        .skip(skip)
        .limit(limit);

    return {
        data,
        page,
        limit,
        totalPages,
        totalResults,
    };
};

export default paginate;