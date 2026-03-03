export const useApi = () => {
    const apiUrl = "https://ru.wikipedia.org/w/api.php";

    const fetchData = async (params: Record<string, string>) => {
        const urlParams = new URLSearchParams(params);
        const url = `${apiUrl}?${urlParams.toString()}&origin=*`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    };

    const getRandomArticle = async () => {
        const params = {
            action: "query",
            format: "json",
            list: "random",
            rnnamespace: "0",
            rnlimit: "1",
        };

        return (await fetchData(params)) as {
            batchcomplete: string;
            continue: {
                rncontinue: string;
                continue: string;
            };
            query: {
                random: {
                    id: number;
                    ns: number;
                    title: string;
                }[];
            };
        };
    };
    const getRandomArticles = async (count: number = 1) => {
        const params = {
            action: "query",
            format: "json",
            generator: "random",
            grnnamespace: "0",
            grnlimit: count.toString(),
            prop: "description|pageprops",
            ppprop: "wikibase_item",
        };

        return (await fetchData(params)) as {
            batchcomplete: string;
            query: {
                pages: {
                    [key: string]: {
                        pageid: number;
                        ns: number;
                        title: string;
                        description?: string;
                    };
                };
            };
        };
    };

    const getArticleText = async (pageId: number) => {
        const params = {
            action: "parse",
            format: "json",
            pageid: pageId.toString(),
            prop: "text",
            disableeditsection: "1",
            disabletoc: "1",
        };
        return await fetchData(params);
    };
    const getArticleByName = async (title: string) => {
        const params = {
            action: "parse",
            format: "json",
            page: title,
            prop: "text",
            disableeditsection: "1",
            disabletoc: "1",
        };

        return (await fetchData(params)) as {
            parse: {
                pageid: number;
                title: string;
                text: { "*": string };
            };
        };
    };

    return {
        getRandomArticle,
        getArticleText,
        getArticleByName,
        getRandomArticles,
    };
};
