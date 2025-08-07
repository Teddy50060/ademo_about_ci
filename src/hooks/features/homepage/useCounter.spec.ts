import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.setVal).toBe('function');
  });

  it('should increment count by default value (1)', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should increment count multiple times', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(3);
  });

  it('should increment count by custom value', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(5);
    });
    
    expect(result.current.val).toBe(5);
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
  });

  it('should increment by new value after changing val', () => {
    const { result } = renderHook(() => useCounter());
    
    // First increment with default value
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
    
    // Change increment value
    act(() => {
      result.current.setVal(10);
    });
    
    // Increment with new value
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(11);
    expect(result.current.val).toBe(10);
  });

  it('should handle negative increment values', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(-2);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(-2);
  });

  it('should handle zero increment value', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(0);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(0);
  });
});