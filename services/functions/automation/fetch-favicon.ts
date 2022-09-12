import axios from "axios";
import { dunedainModel } from "@dunedain/core/model";

export const handler = async (event: any) => {
  const { bookmarkId, url, userId } = JSON.parse(event.Records[0].body) as {
    userId: string;
    bookmarkId: string;
    url: string;
  };

  try {
    const res = await axios.get(
      `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`,
      {
        responseType: "arraybuffer",
      }
    );

    const favicon = Buffer.from(res.data).toString("base64");

    const [bookmark] = await dunedainModel.entities.BookmarkEntity.query
      .user({
        userId,
        bookmarkId,
      })
      .go();

    if (bookmark.favicon === favicon) {
      return;
    }

    await dunedainModel.entities.BookmarkEntity.update({ bookmarkId, userId })
      .set({ favicon })
      .go();
  } catch (e) {
    console.log(`could not update ${bookmarkId} favicon from ${url}`);
    return;
  }

  console.log(`updated ${bookmarkId} from ${url}`);
  return;
};
