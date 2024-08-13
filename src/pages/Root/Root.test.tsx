import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Root from './Root';

describe("Root", () => {
    it("renders", () => {
        render(<Root />);
        //expect(screen.getByRole("heading")).toBeInTheDocument();
    })
})