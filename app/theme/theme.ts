export const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    card: '#F3F3F3',
    primary: '#007BFF',
    secondary: '#6C757D',
    textOnPrimary: '#FFFFFF',
    border: '#D3D3D3',
    input: '#f9f9f9',
    placeholder: '#888888',
    error: '#d9534f',
    switchTrackOn: '#007BFF',
    switchTrackOff: '#D3D3D3',
    switchThumbOn: '#FFFFFF',
    switchThumbOff: '#888888',
    semiTransparent: 'rgba(0, 0, 0, 0.5)',
};

export const darkTheme = {
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    primary: '#1E90FF',
    secondary: '#6C757D',
    textOnPrimary: '#FFFFFF',
    border: '#333333',
    input: '#222222',
    placeholder: '#aaaaaa',
    error: '#ff6666',
    switchTrackOn: '#1E90FF',
    switchTrackOff: '#333333',
    switchThumbOn: '#FFFFFF',
    switchThumbOff: '#888888',
    semiTransparent: 'rgba(255, 255, 255, 0.5)',
};

export type ThemeType = typeof lightTheme;
