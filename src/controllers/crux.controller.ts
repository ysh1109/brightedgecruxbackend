import { GOOGLE_CRUX_ENDPOINT } from "../constants";
import { success } from "../utils/response";


const getCrux = async (url: string) => {
    const response = await fetch(GOOGLE_CRUX_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data?.error) {
        throw {
            url,
            id: Date.now() + Math.floor(Math.random() * 100),
            code: data.error.code,
            message: data.error.message,
            fcp: null,
            lcp: null,
            cls: null,
            inp: null,
        };
    }

    const metrics = data?.record?.metrics || {};

    return {
        id: Date.now() + Math.floor(Math.random() * 100),
        url,
        fcp: metrics.first_contentful_paint?.percentiles?.p75 || null,
        lcp: metrics.largest_contentful_paint?.percentiles?.p75 || null,
        cls: metrics.cumulative_layout_shift?.percentiles?.p75 || null,
        inp: metrics.interaction_to_next_paint?.percentiles?.p75 || null,
    };
};

export const handleGetCrux = async (req: any, res: any) => {
    const { urls } = req.body;
    const results = await Promise.allSettled(urls.map(getCrux));

    const cleaned = results.map((r, i) => {
        if (r.status === "fulfilled") {
            return { ...r.value, status: "ok" };
        }
        return {
            id: r.reason.id,
            url: r.reason.url,
            fcp: null,
            lcp: null,
            cls: null,
            inp: null,
            status: "error",
            errorCode: r.reason.code,
            errorMessage: r.reason.message,
        };
    });

    return success(res, cleaned, "data fetched");
};
