import SeriesPage from "@/app/series/page";
import { render } from "@testing-library/react"
import ReduxProvider from "@/app/components/ReduxProvider";

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
                <SeriesPage />
            </ReduxProvider>
        );
        expect(page).toMatchSnapshot();
    })
})


