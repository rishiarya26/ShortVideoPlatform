import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useTranslation, { TranslationProvider } from '../use-translation';

it('should be a function', () => {
  expect(useTranslation).toBeDefined();
});

it('should return an object', () => {
  const { result } = renderHook(() => useTranslation());
  expect(result.current).toBeDefined();
});

it('should return an language prop pointing to default language', () => {
  const { result } = renderHook(() => useTranslation());
  expect(result.current.language).toBe('en');
});

it('should have functions to get translations and set language', async () => {
  const { result } = renderHook(() => useTranslation());
  const { setLanguage, t } = result.current;
  expect(setLanguage).toBeDefined();
  expect(t).toBeDefined();
});

it('should be able fetch and use translations as defined in the locales file', async () => {
  const TestComponent = () => {
    const { t } = useTranslation();
    return (
      <>
        <div data-testid="dt-label">{t('lblViewMore')}</div>
      </>
    );
  };
  const { getByTestId } = render(
    <TranslationProvider>
      <TestComponent />
    </TranslationProvider>
  );

  expect(getByTestId('dt-label').innerHTML).toBe('View more');
});

it('should be able to change the language', async () => {
  const TestComponent = () => {
    const { setLanguage, language } = useTranslation();
    return (
      <>
        <div data-testid="dt-language">{language}</div>
        <button data-testid="dt-change-language" onClick={() => (setLanguage('hi'))}>Change Language</button>
      </>
    );
  };
  const { getByTestId } = render(
    <TranslationProvider>
      <TestComponent />
    </TranslationProvider>
  );
  expect(getByTestId('dt-language').innerHTML).toBe('en');
  fireEvent.click(getByTestId('dt-change-language'));
  expect(getByTestId('dt-language').innerHTML).toBe('hi');
});

