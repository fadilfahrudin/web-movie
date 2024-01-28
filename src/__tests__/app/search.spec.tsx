import SearchPage from "@/app/search/page"
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
                <SearchPage />
            </ReduxProvider>
        );
        expect(page).toMatchSnapshot();
    })
})


