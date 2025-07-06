/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                text: 'var(--color-text)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                inputs: 'var(--color-inputs)',
            },
            spacing: {
                sm: 'var(--spacing-small)',
                md: 'var(--spacing-medium)',
                lg: 'var(--spacing-large)',
            },
            fontSize: {
                title: 'var(--size-title)',
                heading: 'var(--size-heading)',
                text: 'var(--size-text)',
                subtext: 'var(--size-subtext)',
            },
        },
    },
    plugins: [],
};