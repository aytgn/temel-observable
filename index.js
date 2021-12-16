import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

let emel = {
  next(dergiNumarasi) {
    if (dergiNumarasi % 2 === 0) console.log("doğru dergi!");
    else console.log("yanlış dergi!");
  },
  error() {
    console.log("hata!");
  },
  complete() {
    console.log("artık oyun oynayabilirsin");
  },
};
let aytugan = {
  next(dergiNumarasi) {
    console.log("elimdeki dergi'nin numarasi: " + dergiNumarasi);
  },
  error(err) {
    console.log("hata!");
  },
  complete() {
    console.log("dergiler bitti!");
  },
};

let dergiNumarasi = 0;
const dergiTakibi = new Observable((subscriber) => {
  setInterval(() => {
    if (dergiNumarasi < 10) {
      dergiNumarasi++;
      subscriber.next(dergiNumarasi);
    } else {
      subscriber.complete();
    }
  }, 1000);
});
const aytuTakibi = dergiTakibi.pipe(
  filter((dergiNumarasi) => {
    return dergiNumarasi % 2 === 0;
  })
);

aytuTakibi.subscribe(emel);
