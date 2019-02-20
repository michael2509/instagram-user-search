const getUserData = (page) => {
    page.evaluate(() => {

        const name = document.querySelector('').innerText;
        const country = document.querySelectorAll('.report-rating-subtype')[1].innerText;
        const location = document.querySelector('#preview-page .kyb-user-info-v2__location').innerText;
        const followers_count = document.querySelector('#preview-page .kyb-user-info-v2__el--followers .kyb-user-info-v2__sub-title').innerText;
        const followers_growth = document.querySelector('#report_preview_follower_growth .report_preview_follower_change').innerText;
        const likes_average = document.querySelectorall('.preview-data-val')[0].innerText;
        const comments_average = document.querySelectorall('.preview-data-val')[1].innerText;
        const audience_age_range = document.querySelectorAll('#report_preview_demography strong')[0].innerText;
        const audience_gender = document.querySelectorAll('#report_preview_demography strong')[1].innerText;
        const audience_location = document.querySelector('#report_preview_geography').innerText;
        const audience_language = document.querySelector('#report_preview_language').innerText;
        const interests_1 = document.querySelectorall('.kyb-audience-thematic--title')[0].innerText;
        const interests_2 = document.querySelectorall('.kyb-audience-thematic--title')[1].innerText;
        const interests_3 = document.querySelectorall('.kyb-audience-thematic--title')[2].innerText;
        const interests_1_value = document.querySelectorall('.kyb-percent-color--val')[0].innerText;
        const interests_2_value = document.querySelectorall('.kyb-percent-color--val')[1].innerText;
        const interests_3_value = document.querySelectorall('.kyb-percent-color--val')[2].innerText;

        return { name, country, location, followers_count, followers_growth, likes_average, comments_average, audience_age_range, audience_gender, audience_location, audience_language, interests_1, interests_2, interests_3, interests_1_value, interests_2_value, interests_3_value }
    });
}

export default getUserData;