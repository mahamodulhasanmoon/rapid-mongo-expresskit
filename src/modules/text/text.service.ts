// text.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { IText } from "./text.interface";
    import { Text } from "./text.model";

    // Create New text service
 
    export const createTextService = async (payload: IText) => {
  const result = await Text.create(payload);
  return result;
};

// getAll text service

    export const getAllTextService = async (query: Record<string, unknown>) => {
      const textQueries = new QueryBuilder(Text.find(), query)
      .sort()
      .filter()
      .search([
            'name',
            'category',
            'description',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await textQueries.modelQuery;
      return result ;
};

// get text by Id or single  service

export const getTextByIdService = async (id:string) => {
  const result = await Text.findById(id);
  return result;
};

// delete text by Id or single  service

export const deleteTextByIdService = async (id:string) => {
  const result = await Text.findByIdAndDelete(id);
  return result;
};
// update text by Id or single  service

export const updateTextByIdService = async (id:string,payload:Partial<IText>) => {
  const result = await Text.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      