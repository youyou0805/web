import requests
import re
import json

headers = {  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
}
def request_dandan(url):
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()['comments']
    except requests.RequestException:
        return None


def parse_result(html):
    for item in html:
        yield {
            'nickname': item['user']['nickname'],
            'content': item['content'],
            'time': item['time'],
            'likedCount': item['likedCount']
        }


def write_item_to_file(item):
    print('开始写入数据 ====> ' + str(item))
    with open('content.txt', 'a', encoding='UTF-8') as f:
        f.write(json.dumps(item, ensure_ascii=False) + '\n')
        print('ok')
        f.close()


def main(page):
    url = 'http://music.163.com/api/v1/resource/comments/R_SO_4_506092019?limit=10&offset=' + str(page)
    html = request_dandan(url)
    print(html)
    for item in parse_result(html):
        write_item_to_file(item)


if __name__ == "__main__":
    for i in range(1,10):
        main(i)