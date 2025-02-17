import { describe, it, expect } from 'vitest'
import PathBuilder from '@/core/api/utils.api'

describe('PathBuilder', () => {
  it('should create a simple path', () => {
    const builder = new PathBuilder()
    const result = builder.addPath('api').addPath('users').build()
    
    expect(result).toBe('/api/users')
  })

  it('should handle numeric path segments', () => {
    const builder = new PathBuilder()
    const result = builder.addPath('users').addPath(123).build()
    
    expect(result).toBe('/users/123')
  })

  it('should build path with query parameters', () => {
    const builder = new PathBuilder()
    const result = builder
      .addPath('api')
      .addPath('users')
      .addQuery('page', '1')
      .addQuery('limit', '10')
      .build()
    
    expect(result).toBe('/api/users?page=1&limit=10')
  })

  it('should ignore empty query values', () => {
    const builder = new PathBuilder()
    const result = builder
      .addPath('api')
      .addQuery('filter', '')
      .addQuery('page', '1')
      .build()
    
    expect(result).toBe('/api?page=1')
  })

  it('should handle numeric query values', () => {
    const builder = new PathBuilder()
    const result = builder
      .addPath('products')
      .addQuery('id', 123)
      .build()
    
    expect(result).toBe('/products?id=123')
  })

  it('should return path without query string when no queries are added', () => {
    const builder = new PathBuilder()
    const result = builder
      .addPath('api')
      .addPath('users')
      .build()
    
    expect(result).toBe('/api/users')
  })
})

describe('QueryBuilder', () => {
  it('should build query string with multiple parameters', () => {
    const builder = new PathBuilder()
    const result = builder
      .addQuery('sort', 'desc')
      .addQuery('page', '1')
      .addQuery('limit', '10')
      .build()
    
    expect(result).toBe('?sort=desc&page=1&limit=10')
  })

  it('should return empty string when no query parameters are added', () => {
    const builder = new PathBuilder()
    const result = builder.build()
    
    expect(result).toBe('')
  })

  it('should handle mixed types of query parameters', () => {
    const builder = new PathBuilder()
    const result = builder
      .addQuery('id', 123)
      .addQuery('name', 'test')
      .build()
    
    expect(result).toBe('?id=123&name=test')
  })
});