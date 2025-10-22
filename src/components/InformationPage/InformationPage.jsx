import "./InformationPage.css";
import { useState,lazy,Suspense } from "react";
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));

function InformationPage({subject}) {
    const [commonQA,setCommonQA]=useState([
        {id:1,question:'آیا فیلم ها و سریال ها دارای سانسور میباشند؟',
        answer:'تمام محتوای ارائه شده در آوامووی بدون حذفیات و سانسور میباشند.'
        },
        {id:2,question:'فیلم را دانلود کردم ولی زیرنویس ندارد؟',
        answer:'چنانچه نسخه های سافت ساب (SoftSub) را دانلود نموده اید ، در دستگاه یا پلیر خود ، از منوی تنظیمات ، منوی Subtitle ، چک نموده گزینه زیرنویس فعال باشد و زبان زیرنویس بر روی فارسی (PER or FA) باشد، درصورتی که موفق به پخش زیرنویس در دستگاه خود نشدید ممکن است دستگاه شما از این نوع زیرنویس پشتیبانی نکند.'
        },
        {id:3,question:'فیلم دوبله فارسی دانلود کرده ام اما دوبله نمیباشد؟',
        answer:'فیلم های دوبله ۲ زبانه میباشند این بدان معناس که دوبله فارسی و زبان اصلی بصورت همزمان بر روی فیلم قرار داده شده است ، در صورتی که فیلم زبان اصلی برای شما پخش میشود از منو Audio دستگاه یا پلیر خود ، صوت فیلم را به فارسی تغییر دهید. پیشنهاد ما استفاده از پلیر vlc می باشد.'
        },
        {id:4,question:'فیلم را دانلود کرده ولی فقط صدا/تصویر پخش میشود؟',
        answer:<>
        <strong className="answer-text">با توجه به گسترش روز افزون فرمت های صوت و تصویر گاهاً ممکن است بعضی از فرمت ها در پلیر شما پخش نشود یا دارای صدا یا تصویر نباشد ، لذا برای پخش باید پلیر خود را به آخرین نسخه آپدیت نمایید.
        </strong>
        <strong className="answer-text">پخش کننده های پیش نهادی برای سیستم عامل ویندوز [VLC Player]
        </strong>
        <strong className="answer-text">بسته به ورژن ویندوز خود نسخه ۳۲ بیت یا ۶۴ بیت را دانلود نمایید.
        </strong>
        <strong className="answer-text">پخش کننده های پیشنهادی برای سیستم عامل اندروید دانلود از گوگل پلی [MX player] [VLC Player]
        </strong>
        <strong className="answer-text">پخش کننده های پیشنهادی برای سیستم عامل ios دانلود از اپ استور [VLC For IOS] [Oplayer]
        </strong>
        </>
        },
        {id:5,question:'چرا نظرات من تایید نمیشه؟',
        answer:'نظرات بعد از تایید مدیریت تایید میشه، نظراتی مانند فنگلیش، هرگونه درخواست، گزارش مشکل (بعد از بررسی و اصلاح) تایید نمیشن، فقط نظراتی که راجب خود فیلم و سریال هستن تایید میشن.'
        },
        {id:6,question:'چرا در زمان عضویت با خطا مواجهه می شوم و نمیتوانم عضو شوم؟',
        answer:<>
        <strong className="answer-text">نام کاربری غیر مجاز است که به دو دلیل است که در زیر خواهیم دید:
        </strong>
        <strong className="answer-text">– کاراکترهای غیرمجاز: فاصله (space) و سایر کاراکتر‌ها )) …! ? * & @
        </strong>
        <strong className="answer-text">– نام کاربری تکراری: یک نام کاربری را دو نفر نمیتوانند استفاده کنند و نام کاربری های رند مثل اسم رو با توجه به تعداد عضو های بالا قبلا ثبت شده برای تکراری نبودن آخر نام کاربری عدد اضافه کنید یا حروفی که تکراری نباشد.
        </strong>
        <strong className="answer-text">– حداقل ۴ حرف را وارد کنید ایمیل صحیح نیست که به دو دلیل است که در زیر خواهیم دید:
        </strong>
        <strong className="answer-text">– قبل از هر چیزی باید بدونید ایمیل همان پست الکترونیک شماست و بایستی بدون www وارد شود. اگر ایمیل یا پست الکترونیک صحیح نزنید در موقع فراموشی رمز عبور و بازیابی اکانت با مشکل مواجه خواهید شد.
        </strong>
        <strong className="answer-text">– در ایمیل خود فاصله (space) نزارید هیچ ایمیلی فاصله بین حروف ندارد.
        </strong>
        </>
        },
        {id:7,question:'چرا سریال ها دیر بروز رسانی میشن؟',
        answer:'بدلیل اینکه سریال ها اکثرا با زیرنویس منتشر میشن، گاهی ممکن است اپیزود دیر ترجمه شود، تا زمانی که اطمینان پیدا کنیم محتوا ترجمه خواهد شد صبر میکنیم.'
        },
        {id:8,question:'اشتراک خریدم و وجهه کسر شد اما حساب شارژ نشد؟',
        answer:'فعالسازی حدود 10 دقیقه زمان خواهد برد، چنانچه طی این بازه حساب کاربری شارژ نشد، وجهه کسر شده طی یک اصلاحیه در بازه ی زمانی 72 ساعت کاری به حسابتان باز خواهد گشت'
        },
        {id:9,question:'چرا در تلویزیون زیرنویس نمایش داده نمی شود؟',
        answer:'بدلیل اینکه تلویزیون شما سافت ساب را ساپورت نمیکند.'
        },
        {id:10,question:'چرا برخی از فیلم ها و سریال ها زیرنویس چسبیده نیست؟',
        answer:'کاربر گرامی تمامی محتوا در آوامووی زیرنویس چسبیده نیست، زمانی که کاربری درخواست محتوا میده چنانچه زیرنویس موجود باشه با زیرنویس درج میکنیم چنانچه نباشه بدون زیرنویس درج میکنیم.'
        },
        {id:11,question:'آیا فیلم یا سریال مد نظرمو درخواست بدم میذارید؟',
        answer:'بله کافیست از پنل کاربری، بخش درخواست فیلم و سریال درخواست بدید.'
        },
        {id:12,question:'چرا وسط دانلود قطع شد یا فایل دانلود شده ناقص است؟',
        answer:'کاربر گرامی بایستی از نرم افزار مدیریت دانلود جهت دانلود استفاده نمایید: برای کامپیوتر از دانلود منیجر (internet download manager) و برای گوشی اندرویدی از adm و برای آیفون هم از اپ های مختلف مدیریت دانلود مانند Document استفاده نمایید تا در صورت قطع اینترنت بتوانید از ادامه دانلود نمایید.'
        },
        {id:13,question:'امکان دانلود بیشمار و انبوه در طول روز وجود دارد؟',
        answer:'خیر هر کاربر مجاز به دانلود نیازهای روزانه خود می باشد و در صورت مشاهده دانلود بیشمار از طریق سرور مجازی یا غیره، اکانت مورد نظر غیرفعال خواهد شد.'
        },
        {id:14,question:'امکان دانلود و تماشای آنلاین از خارج ایران وجود دارد؟',
        answer:'فقط امکان تماشای آنلاین در خارج از ایران مهیاست.'
        },
        {id:15,question:'امکان تماشای آنلاین با دوبله وجود دارد؟',
        answer:'خیر در حال حاظر فقط امکان تماشای آنلاین با زیرنویس فارسی مهیاست.'
        },
    ])
    const [dmca,setDmca]=useState([
        'avamovie.in, avamovie.shop is in compliance with 17 U.S.C. § ۵۱۲ and the Digital Millennium Copyright Act (“DMCA”). It is our policy to respond to any infringement notices and take appropriate actions under the Digital Millennium Copyright Act (“DMCA”) and other applicable intellectual property laws. If your copyrighted material has been posted on avamovie.in or if links to your copyrighted material are returned through our search engine and you want this material removed, you must provide a written communication that details the information listed in the following section. Please be aware that you will be liable for damages (including costs and attorneys’ fees) if you misrepresent information listed on our site that is infringing on your copyrights. We suggest that you first contact an attorney for legal assistance on this matter.',
        'The following elements must be included in your copyright infringement claim: – Provide evidence of the authorized person to act on behalf of the owner of an exclusive right that is allegedly infringed. – Provide sufficient contact information so that we may contact you. You must also include a valid email address. – You must identify in sufficient detail the copyrighted work claimed to have been infringed and including at least one search term under which the material appears in avamovie.in search results. – A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law. – A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed. – Must be signed by the authorized person to act on behalf of the owner of an exclusive right that is allegedly being infringed.',
        'Send the written infringement notice to the following address and an email notifcation to: info.avamovie@gmail.com',
        'We inform you that due to problem with our search engine we can’t guarantee that all content will be deleted, please sent us CLICKABLE direct links to each publication which contains your illegal material. Only in this case we can guarantee removal of all content.',
        'Please allow 1-3 business days for an email response. Note that emailing your complaint to other parties such as our Internet Service Provider will not expedite your request and may result in a delayed response due the complaint not properly being filed.'
    ])
  return (
    <><Suspense>
      <NavBar />
    </Suspense>
      <div className="information-page-cont wide-screen">
        <h1 className="information-page-header">
            {
                subject=='common-question'?
                'سوالات متداول'
                :subject=='dmca'?
                'DMCA'
                :subject=='contact-us'?
                'تماس با ما':
                ''
            }
        </h1>
        <div className={`information-page-body ${subject=='dmca'?'dcma':''}`}>
            {
                subject=='common-question' &&
                commonQA.map((questionbox)=>(
          <div className="question-box" key={questionbox.id}>
            <h3 className="question-text">
                {questionbox.question}
            </h3>
            <strong className="answer-text">
            {questionbox.answer}
            </strong>
          </div>
          ))
        }
        {
        subject=='dmca'&&
        dmca.map((text,index)=>(
            <p key={index}>{text}</p>
        ))
        }
        {
        subject=='contact-us'&&
        <>
        <p>برای تماس با تیم آوا مووی با آیدی تلگرام زیر در تماس باشید:</p>
        <p>@admava</p>
        </>
        }


        </div>
      </div><Suspense>
      <MainFooter /></Suspense>
      <Suspense>
      <MobileFooter /></Suspense>
    </>
  );
}

export default InformationPage;
