class QueryBuilder {
  private query: string[] = [];

  public addQueryArugment(key: string, value?: string | number): this {
    const queryEqualsSign: string = '=';
    const queryString: string = `${key}${queryEqualsSign}${value}`;

    if (!value || value === '') {
      return this;
    }

    this.query.push(queryString);
    return this;
  }

  public build(): string {
    const queryStartSign: string = '?';
    const queryConcatSign: string = '&';

    if (this.query.length === 0) {
      return '';
    }

    return `${queryStartSign}${this.query.join(queryConcatSign)}`;
  }
}

class PathBuilder {
  private path: string = '';
  private delimiter: string = '/';
  private queryBuilder: QueryBuilder = new QueryBuilder();

  private addString(path: string | number): this {
    this.path += `${this.delimiter}${path}`;
    return this;
  }

  public addPath(path: string | number): this {
    return this.addString(path);
  }

  public addQuery(key: string, value?: string | number): this {
    this.queryBuilder.addQueryArugment(key, value);
    return this;
  }

  public build(): string {
    return this.path + this.queryBuilder.build();
  }
}

export default PathBuilder;
