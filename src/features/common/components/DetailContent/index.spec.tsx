import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import { render, screen } from "../../utils/test-utils";

import DetailItem from ".";

describe('Test DetailItem', () => {
    beforeEach(() => {
        render(<DetailItem
            breakPoint={2}
            textAlign={'center'}
            title="Sample Title"
            content="Sample Content"
            isLink={true}
            linkTo="/sample-link"
        />)
    })

    test('props being passed correctly', () => {
        expect(screen.getByTestId('detailItemContainer')).toBeInTheDocument();
        expect(screen.getByTestId('detailItemTitle')).toHaveTextContent('Sample Title');
        expect(screen.getByTestId('detailItemLink')).toHaveTextContent('Sample Content');
        expect(screen.queryByTestId('detailItemContent')).not.toBeInTheDocument();
    })

    test('styling being rendered correctly', () => {
        expect(screen.getByTestId('detailItemTitle')).toHaveStyle('font-size: 0.75rem')
    })
})

