import SeriesDetail from "@/app/series/[...slug]/page"
import { render } from "@testing-library/react"
import ReduxProvider from "@/components/ReduxProvider";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname() {
        return {
            prefetch: () => null
        };
    }
}));
describe("Series", () => {
    it("should render", () => {
        const page = render(
            <ReduxProvider>
                <SeriesDetail params={{
                    slug: 61818
                }} />
            </ReduxProvider>
        );
        expect(page).toMatchSnapshot();
    })
})


