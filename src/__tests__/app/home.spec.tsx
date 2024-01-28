import HomePage from "@/app/page"
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
describe("Home Page", () => {
    it("should render", () => {
        const page = render(
            <ReduxProvider>
                <HomePage />
            </ReduxProvider>
        );
        expect(page).toMatchSnapshot();
    })
})


