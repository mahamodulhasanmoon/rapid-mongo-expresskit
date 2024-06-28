import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    // get SearchTerm Using Search

    const searchTerm = this?.query?.searchTerm || '';
    if (this) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach(el => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      this.query && this.query.fields && typeof this.query.fields === 'string'
        ? (this.query.fields as string).split(',').join(' ')
        : '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
