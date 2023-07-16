const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const deviceUser = $('.deviceUser');
const producerBrowser = $(".producer_device");
const ListSong = $(".Song_List");
const SongPlaying = $('.Song_playing');
const Playbtn = $(".play");
const PauseBtn = $(".pause");
const SongName = $(".Song_name");
const SongAuthor = $(".Song_author");
const SongAudio = $(".audio1");
const Songtime = $(".Song_Time");
const SongPlayer = $('.Song_player');
const PreBtn = $(".pre");
const Nextbtn = $(".next");
const Darkbtn = $(".darkmode");
const Lightbtn = $(".lightmode");
const ProfileWrapper = $(".profile_wrapper");
const previewInfo = $(".previewInfo");
const wrapper = $("html");
var index = 0;
const app = {
    currentIndex: 0,
    Songs: [
        {
            name: 'Em Là Của Anh',
            singer: 'Hồ Quang Hiếu',
            src: './assets/mp3/Emlacuaanh.mp3'
        },

        {
            name: 'Hồn Quê',
            singer: 'Hiền Thục',
            src: './assets/mp3/HonQue.mp3'
        },

        {
            name: 'Yosobi',
            singer: 'AV',
            src: './assets/mp3/YOASOBI.mp3'
        },
        {
            name: 'Kiếp Má Hồng',
            singer: "",
            src: './assets/mp3/Kiếp Má Hồng.mp3'
        },
        {
            name: 'Chạnh Lòng Thương Cô',
            singer: "",
            src: "./assets/mp3/ChanhLongThuongCo.mp3"
        },
        {
            name: 'Chạnh Lòng Thương Cô 4',
            singer: "",
            src: "./assets/mp3/ChanhLongThuongCo4.mp3"
        },
        {
            name: 'Tình Bạn Doremon',
            singer: "",
            src: "./assets/mp3/TinhbanDoremon.mp3"
        },


    ],
    // Render danh sách bài hát
    RenderListSong: function () {

        const SongList = this.Songs.map((song) => {
            return `
    <div class="Song_wrapper">
    <div class="Song_Name">${song.name}</div>
    <div class="song_Author">${song.singer}</div>
    <button class="PlaySong" data-index ="${index}">Phát</button>
</div>
    `
        })
        ListSong.innerHTML = SongList.join();
        const PLaySong = $$(".PlaySong");
        PLaySong.forEach((btn, index) => {
            // khi click play
            btn.onclick = function () {
                app.currentIndex = index;
                app.GetcurrentSong(index);
                app.LoadingCurrrentSong(index);
                app.SongPlay();
                app.GettimeSong();
                // khi click Next sau khi ấn play;
                Nextbtn.onclick = function () {
                    index++;
                    if (index > app.Songs.length - 1) {
                        index = 0;
                    }
                    app.GetcurrentSong(index);
                    app.LoadingCurrrentSong(index);
                    app.SongPlay();
                }
                // Khi click Pre sau khi ấn play;
                PreBtn.onclick = function () {
                    index--;
                    if (index < 0) {
                        index = app.Songs.length - 1;
                    }
                    app.GetcurrentSong(index);
                    app.LoadingCurrrentSong(index);
                    app.SongPlay();
                }
                // Tự động chuyển bài sau khi audio kết thúc sau khi ấn play;
                Audio.onended = function () {
                    Nextbtn.click();
                }
            }

        })

    },

    // tải bài hát hiện tại
    GetcurrentSong: function (SongIndex) {
        var currentSong = this.Songs[SongIndex];
        return currentSong;
    },
    LoadingCurrrentSong: function (SongIndex) {
        SongName.innerHTML = this.GetcurrentSong(SongIndex).name;
        SongAudio.src = this.GetcurrentSong(SongIndex).src;
        SongAuthor.innerHTML = this.GetcurrentSong(SongIndex).singer;
    },


    // Play Nhạc
    SongPlay: function () {
        SongAudio.play();

    },
    // Dừng nhạc
    SongPause: function () {
        SongAudio.pause();
    },
    // Chuyển bài kế tiếp
    SongNext: function () {
        var newIndex = this.currentIndex++;
        if (newIndex > app.Songs.length - 1) {
            this.currentIndex = 0;
        }
        app.GetcurrentSong(newIndex);
        app.LoadingCurrrentSong(newIndex);
        app.SongPlay();
        app.GettimeSong();

    },

    SongPre: function () {
        var newIndex = this.currentIndex--;
        if (newIndex < 0) {
            this.currentIndex = app.Songs.length;
        }
        app.GetcurrentSong(newIndex);
        app.LoadingCurrrentSong(newIndex);
        app.SongPlay();
        app.GettimeSong()
    },
    SongActive: function (index) {

    },

    // Sự kiện ấn các phím Phát,Dừng,Tiến,Lùi
    HandleEvent: function () {
        // Khi Play
        Playbtn.onclick = function () {
            app.SongPlay();
            app.GettimeSong();
        };
        // Khi Pause
        PauseBtn.onclick = function () {
            app.SongPause();
        };
        // ấn nút next 
        Nextbtn.onclick = function () {
            app.SongNext();
        }

        // ấn nút pre 
        PreBtn.onclick = function () {
            app.SongPre();
        }
        SongAudio.onended = function () {
            app.SongNext();
        }
        // Khi bài hát đang phát

    },
    // tải thời gian hiện tại
    GettimeSong: function () {
        SongAudio.ontimeupdate = function () {
            var perform = Math.floor((SongAudio.currentTime / SongAudio.duration * 100));
            if (!perform) {
                Songtime.innerHTML = "Chưa phát";
            }
            else if (perform >= 0) {
                SongPlayer.innerHTML = "Bài hát đang phát"
                Songtime.innerHTML = "Đã phát được" + " " + perform + "%";
            }
        }

    },


    // chế độ darkmode, light mode 
    HandleUI: function () {
        Darkbtn.onclick = function () {
            ProfileWrapper.style.backgroundColor = "black";
            ProfileWrapper.style.color = "white";
            previewInfo.style.color = "white";
            wrapper.style.backgroundColor = "black";
            wrapper.style.color = "white";
        }
        Lightbtn.onclick = function () {
            ProfileWrapper.style.backgroundColor = "white";
            ProfileWrapper.style.color = "#333";
            previewInfo.style.color = "#333";
            wrapper.style.backgroundColor = "white";
            wrapper.style.color = "black";

        }

        Darkbtn.addEventListener("click", () => {
            Darkbtn.style.display = "none";
            Lightbtn.style.display = "flex";
        })
        Lightbtn.addEventListener("click", () => {
            Lightbtn.style.display = "none";
            Darkbtn.style.display = "flex";
        })
    },

    // Kiểm tra thiết bị người dùng
    checkDevices: function () {
        const Info = new MobileDetect(window.navigator.userAgent);
        const checkOS = window.navigator.userAgent;
        const checkOSData = window.navigator.userAgentData;
        const OS = checkOSData.platform;
        const Mac = checkOS.match("Mac");
        const Windowsver = "Windows NT"
        const phone = Info.phone();
        const InfoNative = window.navigator.userAgentData;
        const Browser = platform.name;
        const versionBrowser = platform.version;
        // const versionBrowser;
        const checkDevice = () => {
            if (phone) {
                deviceUser.innerHTML = "Bạn đang sử dụng " + " "
                    + OS + " " + "Phiên bản" + " "
                    + Info.version(OS) + ".0"
                producerBrowser.innerHTML = "Bạn đang sử dụng" + " " +
                    "Trình duyệt" + " " + Browser + versionBrowser
            }
            else {
                navigator.userAgentData.getHighEntropyValues(["platformVersion"])
                    .then(ua => {
                        if (navigator.userAgentData.platform === "Windows") {
                            const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
                            if (majorPlatformVersion >= 13) {
                                deviceUser.innerHTML = "Bạn đang sử dụng " + " "
                                    + OS + " " + "Phiên bản" + "11" +
                                    platform.os.architecture + "bit";
                                producerBrowser.innerHTML = "Bạn đang sử dụng" + " " +
                                    "Trình duyệt" + " " + Browser + versionBrowser
                            }
                            else if (majorPlatformVersion > 0) {
                                deviceUser.innerHTML = "Bạn đang sử dụng " + " "
                                    + OS + " " + "Phiên bản" + "10" + " "
                                    + platform.os.architecture + " " + "bit";

                                producerBrowser.innerHTML = "Bạn đang sử dụng" + " " +
                                    "Trình duyệt" + " " + Browser + versionBrowser
                            }
                            else {
                                deviceUser.innerHTML = "Bạn đang sử dụng " + " "
                                    + OS + " " + "Phiên bản" + ""
                                    + platform.os;
                                producerBrowser.innerHTML = "Bạn đang sử dụng" + " " +
                                    "Trình duyệt" + " " + Browser + versionBrowser
                            }
                        }
                        else {
                            deviceUser.innerHTML = "Bạn đang sử dụng " + " "
                                + OS + " " + "Phiên bản" + ""
                                + platform.os;
                            producerBrowser.innerHTML = "Bạn đang sử dụng" + " " +
                                "Trình duyệt" + " " + Browser + versionBrowser
                        }
                    });

            }

        }



        // chay ham
        checkDevice();
    },
    // Khởi chạy ứng dụng
    start: function () {
        app.GetcurrentSong(index);
        app.LoadingCurrrentSong(index);
        app.RenderListSong();
        app.HandleEvent();
        app.checkDevices();
        app.HandleUI();
    }
};
app.start();