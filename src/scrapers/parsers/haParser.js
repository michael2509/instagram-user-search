import cheerio from 'cheerio';

const haParser = (html) => {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(html);

        const userData = {
            name: $('#preview-page .kyb-user-info-v2__name').text().trim(),
            username: $("meta[property='profile:username']").attr("content"),
            country: $('.report-rating-subtype').eq(1).text().trim(),
            location: $('#preview-page .kyb-user-info-v2__location').text().trim(),
            followers: {
                count: $('#preview-page .kyb-user-info-v2__el--followers .kyb-user-info-v2__sub-title').text().trim(),
                growth: $('#report_preview_follower_growth .report_preview_follower_change').text().trim()
            },
            likes_average: $('.preview-data-val').eq(0).text().trim(),
            comments_average: $('.preview-data-val').eq(1).text().trim(),
            audience: {
                age_range: $('#report_preview_demography strong').eq(0).text().trim(),
                gender: $('#report_preview_demography strong').eq(1).text().trim(),
                location: $('#report_preview_geography').text().trim(),
                language: $('#report_preview_language').text().trim(),
                interests: {
                    title: [$('.kyb-audience-thematic--title').eq(0).text().trim(), $('.kyb-audience-thematic--title').eq(1).text().trim(), $('.kyb-audience-thematic--title').eq(2).text().trim()],
                    value: [$('.kyb-percent-color--val').eq(0).text().trim(), $('.kyb-percent-color--val').eq(1).text().trim(), $('.kyb-percent-color--val').eq(2).text().trim()]
                }
            }
        }

        userData ? resolve(userData) : reject('user data not found');
    })
}

export default haParser;