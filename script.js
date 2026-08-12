document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       PRELOADER
    ========================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            preloader.classList.add("hide");

        }, 300);

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("open");

    });


    navbar.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("open");

        });

    });


    /* =========================
       DOCTOR SEARCH
    ========================= */

    const findDoctorBtn =
        document.getElementById("findDoctorBtn");

    const locationSearch =
        document.getElementById("locationSearch");

    const specialistSearch =
        document.getElementById("specialistSearch");

    const searchResult =
        document.getElementById("searchResult");

    const doctorCards =
        document.querySelectorAll(".doctor-card");

    const noDoctors =
        document.getElementById("noDoctors");


    findDoctorBtn.addEventListener("click", function () {

        const location =
            locationSearch.value.trim().toLowerCase();

        const specialist =
            specialistSearch.value.trim().toLowerCase();

        let count = 0;


        doctorCards.forEach(function (card) {

            const cardLocation =
                card.dataset.location.toLowerCase();

            const cardSpecialist =
                card.dataset.specialist.toLowerCase();


            const locationMatch =
                location === "" ||
                cardLocation.includes(location);


            const specialistMatch =
                specialist === "" ||
                cardSpecialist.includes(specialist);


            if (locationMatch && specialistMatch) {

                card.style.display = "block";

                count++;

            } else {

                card.style.display = "none";

            }

        });


        if (count === 0) {

            noDoctors.style.display = "block";

            searchResult.textContent =
                "No matching doctors found.";

        } else {

            noDoctors.style.display = "none";

            searchResult.textContent =
                count +
                " doctor" +
                (count > 1 ? "s" : "") +
                " found.";

        }


        document
            .getElementById("doctors")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* =========================
       BOOK APPOINTMENT BUTTON
    ========================= */

    const doctorSelect =
        document.getElementById("doctorSelect");

    const doctorEmail =
        document.getElementById("doctorEmail");


    document.querySelectorAll(".book-doctor")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const doctor =
                    button.dataset.doctor;

                const email =
                    button.dataset.email;


                doctorSelect.value = doctor;

                doctorEmail.value = email;


                document
                    .getElementById("appointment")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            });

        });


    /* =========================
       DOCTOR -> EMAIL
    ========================= */

    doctorSelect.addEventListener("change", function () {

        const option =
            doctorSelect.options[
                doctorSelect.selectedIndex
            ];

        doctorEmail.value =
            option.dataset.email || "";

    });


    /* =========================
       DATE
    ========================= */

    const appointmentDate =
        document.getElementById("appointmentDate");


    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");


    appointmentDate.min =
        `${year}-${month}-${day}`;


    /* =========================
       APPOINTMENT FORM
    ========================= */

    const appointmentForm =
        document.getElementById("appointmentForm");

    const successMessage =
        document.getElementById("successMessage");


    appointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const patientName =
                document.getElementById("patientName").value;

            const patientEmail =
                document.getElementById("patientEmail").value;

            const phone =
                document.getElementById("phone").value;

            const doctor =
                doctorSelect.value;

            const email =
                doctorEmail.value;

            const date =
                appointmentDate.value;

            const time =
                document.getElementById(
                    "appointmentTime"
                ).value;

            const problem =
                document.getElementById("problem").value;

            const message =
                document.getElementById("message").value;


            if (!email) {

                successMessage.style.color = "red";

                successMessage.textContent =
                    "Please select a doctor.";

                return;

            }


            /* Email subject */

            const subject =
                "Doctor Appointment Request - " +
                patientName;


            /* Email body */

            const body =

`Hello ${doctor},

I would like to book an appointment.

Patient Name: ${patientName}

Patient Email: ${patientEmail}

Phone Number: ${phone}

Appointment Date: ${date}

Appointment Time: ${time}

Reason: ${problem}

Additional Message:
${message || "No additional message"}

Thank you.
`;


            /*
                Opens user's email application.
                For automatic email sending,
                backend + Nodemailer is required.
            */

            const mailto =
                "mailto:" +
                email +
                "?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);


            window.location.href = mailto;


            successMessage.style.color =
                "#15945c";

            successMessage.textContent =
                "Appointment details are ready. Your email application will open.";

        }
    );


    /* =========================
       ABOUT TABS
    ========================= */

    const tabs =
        document.querySelectorAll(".tab");

    const tabContent =
        document.getElementById("tabContent");


    const tabData = {

        vision:
            "Our vision is to make quality healthcare easier to discover and convenient to access.",

        mission:
            "Our mission is to connect patients with trusted healthcare professionals through a simple appointment experience.",

        strategy:
            "Our strategy focuses on easy doctor discovery, simple booking and a patient-friendly digital experience."

    };


    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            tabs.forEach(function (item) {

                item.classList.remove("active");

            });


            tab.classList.add("active");


            const selected =
                tab.dataset.tab;


            tabContent.textContent =
                tabData[selected];

        });

    });


    /* =========================
       SUBSCRIBE
    ========================= */

    const subscribeForm =
        document.getElementById("subscribeForm");


    subscribeForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            alert(
                "Thank you for subscribing to Doclab!"
            );

            subscribeForm.reset();

        }
    );


    /* =========================
       BACK TO TOP
    ========================= */

    const backTop =
        document.getElementById("backTop");


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        }
    );

});
document.getElementById("appointmentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("date").value;

    document.getElementById("bookingMessage").innerHTML =
        "✅ Appointment booked successfully!<br>" +
        "Patient: " + name + "<br>" +
        "Doctor: " + doctor + "<br>" +
        "Date: " + date;

    this.reset();

});