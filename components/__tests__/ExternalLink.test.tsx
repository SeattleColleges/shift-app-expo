import React from 'react';
import { render } from '@testing-library/react-native';
import { ExternalLink } from '../ExternalLink';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { fireEvent } from '@testing-library/react-native';

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
}));

describe('ExternalLink', () => {
  const href = 'https://example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with text', () => {
    const { getByText } = render(
      <ExternalLink href={href}>Visit Example</ExternalLink>
    );
    expect(getByText('Visit Example')).toBeTruthy();
  });

  it('calls openBrowserAsync on native platforms', async () => {
    // Set platform to native
    Object.defineProperty(Platform, 'OS', {
      value: 'ios',
    });

    const { getByText } = render(
      <ExternalLink href={href}>Native Test</ExternalLink>
    );

    const link = getByText('Native Test');

    // Manually trigger onPress with a fake event
    await fireEvent.press(link, {
      preventDefault: jest.fn(),
    });

    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(href);
  });

  it('does NOT call openBrowserAsync on web', async () => {
    // Set platform to web
    Object.defineProperty(Platform, 'OS', {
      value: 'web',
    });

    const { getByText } = render(
      <ExternalLink href={href}>Web Test</ExternalLink>
    );

    await fireEvent.press(getByText('Web Test'));

    expect(WebBrowser.openBrowserAsync).not.toHaveBeenCalled();
  });
});
