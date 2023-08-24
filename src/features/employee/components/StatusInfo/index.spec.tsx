import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import { render, screen } from '../../../common/utils/test-utils';

import StatusInfo from ".";

test('props being passed correctly', () => {
    const { rerender } = render(<StatusInfo isActive />)

    expect(screen.getByTestId('statusInfoContainer')).toHaveTextContent('Active')
    expect(screen.getByTestId('statusInfoContainer')).not.toHaveTextContent('Inactive')

    rerender(<StatusInfo isActive={false} />)
    expect(screen.getByTestId('statusInfoContainer')).toHaveTextContent('Inactive')
    expect(screen.getByTestId('statusInfoContainer')).not.toHaveTextContent('Active')
})
