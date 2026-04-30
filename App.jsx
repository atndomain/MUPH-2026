import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const candidates = [
  { city: "Albay", name: "Alexandra Krishna Oriño", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684213908_122180886326757835_2448435107454216933_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=r3QplT86eyMQ7kNvwG9ZRJy&_nc_oc=AdrVjTVvfpnkZm4YSy0L2-6Qy7FgVP-3C7YSuZlwHbjj89FYhte5jA-0Ub1EJGqFfA4&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=KVbYX-Cr55AagQhR77HHiw&_nc_ss=7b2a8&oh=00_Af0tBZpS2XrMUmNGpAXM0f9G9JHK9gumk0M1KSbUDGagxg&oe=69F8CA70" },
  { city: "Baguio", name: "Roxie Baeyens", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684593336_122180887718757835_3599751940426139746_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=7b2446&_nc_ohc=d1-bdyAL524Q7kNvwGQhbXw&_nc_oc=Adp-8ke8x9L9Byfe8bt7cLvlgHVzpfW4DtjxhO7nCfBanoca-j4TSdX98uHv9SSuApg&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=4ejRQww-OCgzhzwIXvsX5A&_nc_ss=7b2a8&oh=00_Af0X1_ZEmAd-AROjcfZNdkeZedCphya9ECmjmhvmflHFmQ&oe=69F8D3F4" },
  { city: "Cabanatuan City", name: "Princess Ryla Hernandez", note: "Filipino Society of Alberta, Canada", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684295361_122180886818757835_3905345751890065105_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=X2KDexXA43wQ7kNvwHUTzjo&_nc_oc=Adpw_BH5J8tL7Q6PU2itIfWK1UfhC3HCllh-fzID-OPhHpik1uQjaxyyXDmYmU2ZdoI&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=vpKiLPpKWz6Z-qrsh2wu5w&_nc_ss=7b2a8&oh=00_Af3Ev5CopnnpHQFQMjvR069DbN9jFZAFU2qXbUhwVT6cOA&oe=69F8D790" },
  { city: "Camiguin", name: "Erica Cadayday", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/685291367_122180887484757835_8548800178849178897_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=KyVNfRHU828Q7kNvwFP6ss_&_nc_oc=Adq_URazy3JHFQOOek_53BUiYf26i-P87Gs9V8vF0HcdBvesfSxnFU7lUPEIoo15zgk&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=AEBJvsJqAS5x-c7IuelMUQ&_nc_ss=7b2a8&oh=00_Af3T0T70tz2hk5yyYqIMHabDDj3wc32-NFsWmJEjtyT6iw&oe=69F8D810" },
  { city: "Cavite", name: "Jencel Caña", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/685142633_122180887142757835_133892317780534081_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=-zerUgkS24IQ7kNvwEMqHGN&_nc_oc=AdqJI0c4hueKNahxJtS5ZzmGdr3y3mizxF7vTSXbNHTtVzs3ynm5n7J5qWXPL54eWS4&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=8E66z1oaJFTw0SwhC7dySQ&_nc_ss=7b2a8&oh=00_Af0lrsANJqMyjpeb_Cm5TjAbAZ4DeV0HhgFbhtf70PhEKQ&oe=69F8C32C" },
  { city: "Cebu City", name: "Apriel Smith", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684737957_122180887874757835_1042546779515364061_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=FpGaOvjNTkkQ7kNvwGS4O0z&_nc_oc=AdqrPhal0tROZesoNCxnFJypCDzy1ReNwCMD5hFtgPGgockiO5x9zW-OVkc--f0s1Hs&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=TY8_oZZMI5Cd7Awaqrov4Q&_nc_ss=7b2a8&oh=00_Af3nnD_pbcx8lfh8c-qjfI0F-9omHBE6tVamuILOb4448A&oe=69F8B3B2" },
  { city: "Cebu Province", name: "Nicole Borromeo", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684669010_122180886920757835_8842950161026789360_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ooNkdauIKa8Q7kNvwHjiaLa&_nc_oc=AdrF5x7jfg3l1lHVdK7YB1mCTmSTxeDEFcqws1Kl4h-0Ll2xlk1AjHv09oIHcFpsREk&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=7TacB8Lqxr-o2bj5TU9vbw&_nc_ss=7b2a8&oh=00_Af0jmHoVwMRo8z55zPl-w-oUfauNy3wf4hjgw71GDertuw&oe=69F8DA3E" },
  { city: "Cotabato Province", name: "Clarissa Westram", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/683008597_122180887772757835_6359627565270021933_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OEDp6v3xPFsQ7kNvwHB0HxY&_nc_oc=AdrlMlG2VW0ScVaWtEDFQFcwIP4cJtxYKFzkbf8eHJo1zDE0q4Prv_OpWNO6uC8fPQ0&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=8mqlbKd7XbLYpcbcSdhK9Q&_nc_ss=7b2a8&oh=00_Af1EzMF1KYRVjL4FJBAbIWqgRtkyOORZoCS8PIVoJq4ing&oe=69F8E58A" },
  { city: "Ilocos Norte", name: "Cherieze Cacayorin", note: "Filipino Society of Hawaii", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684177803_122180887490757835_363813564615837659_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dplxdzBbRecQ7kNvwEQCTM5&_nc_oc=AdovCTLPZ2lkeUMvGWjqnaMkQttjXU3G-rKzU9NSuP7gCnKKdsLg5HEIbWXj7fpbAto&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=ZWzw-kPMZtggtiAuwj-Nng&_nc_ss=7b2a8&oh=00_Af2CYUk0rfMKHQS6At7fzJvje9jtEpHNWUcGVfyrtC3sQQ&oe=69F8D44A" },
  { city: "Iloilo City", name: "Zestah Espinosa", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684204292_122180887508757835_1487205238201429593_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Aq9Rows_mwAQ7kNvwGr2vTw&_nc_oc=AdoN0OQjFZtBVVvdHzmVkAq6GosTcNi1ApeGH-72KxdfZ2WL0CNyLH-W2gujXfN-aBU&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=SlqElcQ1uFwv9oihbtNWKQ&_nc_ss=7b2a8&oh=00_Af2WHaE7_W8jC5zPDL6QPYD0VrK2tx0IIk73f2yIrnT5YQ&oe=69F8B4A1" },
  { city: "La Union", name: "Bea Millan-Windorski", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684167910_122180887364757835_2196171469952368801_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=tCHuG4XS6UEQ7kNvwHrhyqM&_nc_oc=Adpv78KfAIvQSBO-NS8UDcWIYemLBe1qRVP_WZgLxWvZzyvn7160YsC7zWfzM9MTKGs&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=vx8i-1vVzw5rxdAo9MsP_A&_nc_ss=7b2a8&oh=00_Af1b4_4h8cCRbSmM5lsZNM4x1V3_RDc8W-qFOhvOY36ASw&oe=69F8DD12" },
  { city: "Laguna", name: "Ysabel Prats", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684187981_122180888096757835_5949931078914190218_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Bgh_R-CBtgQQ7kNvwG3ZH6Q&_nc_oc=Ado4dFdntEp3hoYglZSFSnjo-TETwEXMiR7ISR-CrAjK8sxfR089nB8YOKUnvsGMn28&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=kkrR5mzv11ax-ByWqICCFg&_nc_ss=7b2a8&oh=00_Af15VHzk4A-ufs3_zzp9CmaVtOO4GzdhxgWeaxHLHCCBqw&oe=69F8EA99" },
  { city: "Los Baños, Laguna", name: "Scarlett Anne De Mesa", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/686930666_122180886878757835_2026740024975261994_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=msw_7xXUHxIQ7kNvwHf-OF7&_nc_oc=AdppnBc34OvM-i6upo9SqT-yI8w3YndTyDCegY64kxLNfcJ6khKC4YE3IsU1AGHHgWc&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=xWMNWNdIdrqxMmwbHTHaGA&_nc_ss=7b2a8&oh=00_Af0niJOwfkFfTnsxos0-GNHPE9qObVkci4rfXc8ip33ZFA&oe=69F8CFB3" },
  { city: "Manila", name: "Justine Felizarta", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/685898944_122180887094757835_2566189146898081887_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=TDcxgMqqqMgQ7kNvwFFYMPn&_nc_oc=AdrLzKBQhGOEp3jE8ERmM04x5I18_Lt_fL9-0KTVFGtyndhEQP95_my5p-55TEctmhQ&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=S8efQjdUz8v_qXWAHsOMDg&_nc_ss=7b2a8&oh=00_Af3Xlwbz8bevTJeYobQcO0UBWGu1FkCnwHqv0PpNcphdvw&oe=69F8DD03" },
  { city: "Mountain Province", name: "Lyneree Montero-Yodong", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684962591_122180886824757835_8342728599116549745_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=cEJtWDjAkZ4Q7kNvwEVq8z4&_nc_oc=AdoNZFl4PNfIRD2UkaROqYALxNgIdx0BADfxOY_XOBi046Sg4C5RPBwXNK23JuQyWvg&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=fSODsKSTIKoHkcYi_WF5jQ&_nc_ss=7b2a8&oh=00_Af2QgORW1OeMcRhAAQytHGbZpYFDKxLR35hJgicmndp54A&oe=69F8D8F1" },
  { city: "Muntinlupa", name: "Adela-Mae Marshall", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/682857741_122180888066757835_553493129562279012_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Rh304BBwVMYQ7kNvwHlKpGX&_nc_oc=AdqBGVm1rX2WWN9VMQ7QWJ5aFS9W49NE6ctBhnT7Aag5T2s9ZXuaHIb5ICvSPfnAYuI&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=9D3mIK7lPQNq9pLypspNHg&_nc_ss=7b2a8&oh=00_Af0zuAYaPw3pVXTPWPD_LqA89BNpFgrJezT_asEbs3TDgw&oe=69F8CF1D" },
  { city: "Negros Occidental", name: "Alexandra Colmenares", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684159041_122180888030757835_3187634699883934397_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yalvHZBYL5YQ7kNvwGvEzPx&_nc_oc=AdrWPO13JTp8cdfpnhpjWs2pU4m-X6Nc72EGXWtuJMc39G0Apj5LesxdqeZ2p7ZdHUI&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=qw_46eI5t6M9y0_TSB-Pvg&_nc_ss=7b2a8&oh=00_Af1PiXXnDHSS385FQZ6Bd2Wu48MiyX5PIg0Z3ce2YSYErg&oe=69F8BA78" },
  { city: "Nueva Ecija", name: "Michelle Burchelle", note: "Filipino Society of the United Kingdom", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684247337_122180888120757835_2873593610779808388_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=FixWa2YaQ3MQ7kNvwHGOOHl&_nc_oc=AdrD6jTqbAoMzYi00lFfDhGo_nIrkYyaiO7KYTABfNCsa6mP7rMURKqijLvVr5Tl4vE&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=ehgoAGR5NIM6nM77TjNpOA&_nc_ss=7b2a8&oh=00_Af3FcCBiBunVpzvjMBQdxVOWu_LXJkLbyds4y9ylVYx3yw&oe=69F8D91D" },
  { city: "Nueva Vizcaya", name: "Jacqueline Aluning", note: "Filipino Society of Washington", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/682941818_122180888102757835_7601918685154363428_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=VFGouKjo1VEQ7kNvwGBz4os&_nc_oc=Adrq2Q1Rt_RE_BaHGrbx5e54nZoS74dAdRMrqbStgBRUiSIqovZfSawA66nlEvfAZ94&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=BKUX2_SHUAESDBdBsZ_pww&_nc_ss=7b2a8&oh=00_Af0lCuvtjssxkSBBmwT7EmBij_cGLoTajgrX8LZ_QGGrIg&oe=69F8D523" },
  { city: "Occidental Mindoro", name: "Neil Silva", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684153636_122180886926757835_716191266943676171_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=TbgFgs_l2UIQ7kNvwG5hi4B&_nc_oc=Adp-x7qi6aFz4as7OiET3BRKNcvhOxCWC-TRnHAx9jU_wFIooeipxwHF1JxjzlxfgTU&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=BAlonjb08mfciz5XVT_W5g&_nc_ss=7b2a8&oh=00_Af1MXGNtPIOoto6VSFaqrsGIfjcLNBbmKj0pQENXEn19lA&oe=69F8C885" },
  { city: "Pampanga", name: "Allyson Hetland", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/685750334_122180887760757835_1778019681656030687_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=DyGf3B2ONEMQ7kNvwGwL62L&_nc_oc=Adp86DPhypFsNXSOREQu6fXm83eAvph_67BeqOKkVyqXRUYj2_tXnYw8vvjn-F_LE9A&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=HC2E0IbeeqiXmpBCUB74DA&_nc_ss=7b2a8&oh=00_Af3xt5aOfxgdq23kk3-at0KqDhjLPQ7KdZvlhdzLbFoDNA&oe=69F8DD78" },
  { city: "Pangasinan", name: "Donna Rein Nuguid", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684258786_122180888018757835_1479063812718583501_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=DQk1LHKBDwMQ7kNvwEtSm7b&_nc_oc=AdrisRsdZd5T9cd4oFxsAS4A1J-3CZmcq03zuzDAeXXlGGGEgPb1oePzk08_d2KVitU&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=ZWmiZetTz28Kj1bIbW06Wg&_nc_ss=7b2a8&oh=00_Af2F0PW6gCZtfRW815KpQJu_scUO3dCWJa1UBr3OUqe8ow&oe=69F8E13B" },
  { city: "Quezon Province", name: "Patricia Ella Evangelista", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/680140065_122180886368757835_5632201502814587683_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=l4JYAutaSCQQ7kNvwFznwRl&_nc_oc=Adp-nLDBye2zyTmBqd67OQouRpFmFkkQDFWO9EwHiGtXwoJIH_8p4T3i7raQag2Eb3Q&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=EnAOAs_I3AjggIxbYP0DoA&_nc_ss=7b2a8&oh=00_Af367pq5Qek4mhZXRl-K31BV_v7MsMrkER5tZj5cn32FlQ&oe=69F8D9DB" },
  { city: "Rizal", name: "Alicia Buendia", note: "Filipino Society of Southern California", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684485267_122180888144757835_2962381684903699260_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Cg0rYEH1HR0Q7kNvwERwtG8&_nc_oc=AdrjuqcSzZx7ZkT7urYkzbOo5nLu8nbOoiWihoiiI4fkEJO11Tuv0vGh5GX4LXFquUQ&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=or0-PVC05rvTfxbw9UuieA&_nc_ss=7b2a8&oh=00_Af2vMlFLXGYSyWB0hYjrwfz3t2SdLsVmc5XqqobXXgE1iw&oe=69F8D5F8" },
  { city: "Samar Island", name: "Catherine Wardle", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/685047596_122180887400757835_793296236548822332_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=23OILZkMVUYQ7kNvwHGPf8X&_nc_oc=AdroidQp5B9fb017jaMMUOcRrgVt8kG3gMT2A9Qu3fFnoOg3BlECu8x0iIouPJYVjEU&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=kwsftgqhffD77tZVyKwRFQ&_nc_ss=7b2a8&oh=00_Af0pSvn05Z_bdy5vF97YERah0qfKPRxDHMrJyuieDirlQw&oe=69F8C35B" },
  { city: "San Jose, Negros Oriental", name: "Jayka Munsayac", note: "Filipino Society of Bellevue, Washington", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/685139338_122180887250757835_1367921478471272560_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=5jGX-r6lGOwQ7kNvwHqdSqD&_nc_oc=Adqh29O91DLEPMEFHLLPaqWO9W9ijRx9sstC5zx-4VZWluM5d4idIMaSIZLGLZpnSfU&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=cbXWpwUQ9QUSCZUez-1XqQ&_nc_ss=7b2a8&oh=00_Af3Ss_xpGI9tV-7m7xCHWiWZqc3HeQkqN87Hxdx09E6iMw&oe=69F8D2CA" },
  { city: "Sultan Kudarat", name: "Jenrose Javier", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/684214709_122180888174757835_6781950486152314212_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=zXAoFMsxSxoQ7kNvwGeF1yy&_nc_oc=AdrijHKC3u_zO11D3ctOuiCuaYQicOeB8Nm0RuOaR3AAuM9_1FhQQWuPxhC7TzI8R08&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=vpP1pcbSnDH8hNE2Sj-zBg&_nc_ss=7b2a8&oh=00_Af3B99EfvtrmXNcIbbuwuP0UexLmTuNFy36948JvIrYLLg&oe=69F8E4C8" },
  { city: "Tacloban City", name: "Jacqueline Gulrajani", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684279037_122180888150757835_4970074467776354710_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=x5DjZUJBU_kQ7kNvwERkcmI&_nc_oc=AdqZX46yUbl2ZfwL2fcV5akR25Du_XoCcWR3X3UcJor8ldahbiznR9i2Sg-zpTS2yNM&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=3I8j6CWstYLrRVvOACc0pg&_nc_ss=7b2a8&oh=00_Af3C2TYdIvWcrjFmpN4DDPHsdq9hU2If1Q0ZKyBZyja4Ng&oe=69F8D31D" },
  { city: "Taguig", name: "Ysabella Ysmael", image: "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/682843490_122180887706757835_7517361211844359379_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=uBIdGgofJcAQ7kNvwHP-gX3&_nc_oc=AdqCcg4cQMr97rCXDDFnf6q50CQ9EdlkQNFh4OMVrkvgvKwWxq3NOBg10D2pa4dWliI&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=Jc3nsrIh1HcWhecItj9rUg&_nc_ss=7b2a8&oh=00_Af0PKhGKbaTlMFbxNMoeAdAJNFcjz7fUQk1A-0-vMjlpYw&oe=69F8D363" },
  { city: "Tandag City", name: "Chrystel Mae Correos", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/684246592_122180887856757835_4254367447244113512_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=QYikFm9XkgMQ7kNvwFM3qAq&_nc_oc=AdoPmvhFwA-hB1P6GZnTFiRUwu6EgWizqyOAmx8lI_FHJdsTooOiqaGvM6nqWkAVl0k&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=rC7oleczNbxZGYdlUXp79g&_nc_ss=7b2a8&oh=00_Af3y0vjyfAa3SR0Abm5T54crQx4qLiyOfwCnWTaaxu0hiA&oe=69F8BA7E" },
  { city: "Tarlac", name: "Marian Arellano", image: "https://scontent.fdvo1-1.fna.fbcdn.net/v/t39.30808-6/685142633_122180888162757835_2750101556161659682_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=M3lGtPOsTyYQ7kNvwFiUSxI&_nc_oc=Adq3ys1gVFrXZhidLlKRb_L6xPjYBDYz2gl157PwU7lWbScJkz0u-EpDCjr_uxseW_U&_nc_zt=23&_nc_ht=scontent.fdvo1-1.fna&_nc_gid=OEpFRv3fJcwl1TKVOeDyrQ&_nc_ss=7b2a8&oh=00_Af1MI1YkYEHReli1miBtSEVyY1OBqfuew1LrUog5yIuApA&oe=69F8E47C" },
].map((candidate, index) => ({ ...candidate, id: index + 1 }));

const navLogo = "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/619672508_1479816063502490_4339372067152770702_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=xKFmrX5dutUQ7kNvwHFSasb&_nc_oc=AdqJsjHXC0S6QYUGSTf7DJlwhk-3G6gsobW66nx5XJ2fisaWaD-CASN9DhDhOAE6Wbc&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=MLXR4t2BPl1mua7mDfeXrQ&_nc_ss=7b2a8&oh=00_Af3nZWKHtgMhGC3-acZdgz8_snCB4ixOKoDdmvE3vfh2Pg&oe=69F8AA16";
const featureBackgroundImage = "https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/618527604_1477419107075519_595475860559078943_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2a1932&_nc_ohc=6lLmRcivJYoQ7kNvwGs0NSn&_nc_oc=AdpcQG9sAMz48EfXwk_kSa0_0LIukEw8Hml-fzgho-GqDZMtIt1abqicLQ0NmYGdoWI&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=6C0OxgE5KN75aLUOCmZ02A&_nc_ss=7b2a8&oh=00_Af0MSRLQRDY9oZ_uLEX2O4MDFSrokfyfKZ45xSxkBxPxNQ&oe=69F8D8BB";
const muphEventDate = new Date("2026-05-02T19:00:00+08:00");
const titles = [
  { key: "universe", label: "Miss Universe Philippines", shortLabel: "Miss Universe Philippines" },
  { key: "supranational", label: "Miss Supranational Philippines", shortLabel: "Miss Supranational Philippines" },
  { key: "cosmo", label: "Miss Cosmo Philippines", shortLabel: "Miss Cosmo Philippines" },
  { key: "charm", label: "Miss Charm Philippines", shortLabel: "Miss Charm Philippines" },
  { key: "eco", label: "Miss Eco International Philippines", shortLabel: "Miss Eco International Philippines" },
  { key: "firstRunnerUp", label: "Miss Universe Philippines 1st RU", shortLabel: "Miss Universe Philippines 1st RU" },
  { key: "secondRunnerUp", label: "Miss Universe Philippines 2nd RU", shortLabel: "Miss Universe Philippines 2nd RU" },
];

function getCountdownTime() {
  const total = Math.max(0, muphEventDate.getTime() - Date.now());
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function filterCandidates(candidateList, query) {
  const cleanQuery = query.trim().toLowerCase();
  console.log("[MUPH Debug] Filtering candidates", { query: cleanQuery });
  if (!cleanQuery) return candidateList;
  return candidateList.filter((candidate) =>
    candidate.name.toLowerCase().includes(cleanQuery) ||
    candidate.city.toLowerCase().includes(cleanQuery) ||
    candidate.note?.toLowerCase().includes(cleanQuery)
  );
}

function getNextPicks(currentPicks, titleKey, candidateId) {
  console.log("[MUPH Debug] Assigning title", { titleKey, candidateId, currentPicks });
  const updated = { ...currentPicks };
  Object.keys(updated).forEach((key) => {
    if (updated[key] === candidateId) delete updated[key];
  });
  updated[titleKey] = candidateId;
  console.log("[MUPH Debug] Updated picks", updated);
  return updated;
}

function CandidatePhoto({ candidate, photos, brokenImages, onImageError, compact = false }) {
  console.log("[MUPH Debug] Resolving candidate image", { id: candidate.id, name: candidate.name });
  const imageSource = photos[candidate.id] || (!brokenImages[candidate.id] ? candidate.image : "");

  if (imageSource) {
    return <img src={imageSource} alt={`${candidate.name} representing ${candidate.city}`} loading="lazy" className="h-full w-full object-cover" onError={() => onImageError(candidate.id)} />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#1a1a22] to-[#050506] p-4 text-center">
      <div className={`${compact ? "h-12 w-12 text-base" : "h-24 w-24 text-3xl"} grid place-items-center rounded-full bg-white/10 font-semibold text-white shadow-sm ring-1 ring-white/15`}>
        {getInitials(candidate.name)}
      </div>
      {!compact && <p className="mt-4 text-[11px] font-medium text-white/60">Candidate portrait</p>}
    </div>
  );
}

function TitleCard({ title, selectedCandidate, photos, brokenImages, onImageError, onClear }) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/20 bg-[linear-gradient(180deg,rgba(84,116,189,0.30)_0%,rgba(15,30,78,0.88)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.38)] ring-1 ring-white/10 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/30">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_36%,rgba(255,255,255,0.04)_100%)]" />
      <div className="relative min-h-[194px] overflow-hidden p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <img src={navLogo} alt="MUPH logo" className="h-full w-full object-cover" />
          </div>
          {selectedCandidate && <button onClick={onClear} className="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-xl transition hover:bg-white/22">Clear</button>}
        </div>
        <div className="mt-12">
          <h3 className="max-w-[92%] text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">{title.label}</h3>
        </div>
      </div>
      <div className="relative border-t border-white/12 p-4">
        {selectedCandidate ? (
          <div className="flex items-center gap-3 rounded-[22px] border border-white/15 bg-[linear-gradient(180deg,rgba(7,25,69,0.58),rgba(14,36,96,0.78))] p-3 shadow-inner backdrop-blur-xl">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/20 bg-white/8 ring-1 ring-white/10 backdrop-blur-xl">
              <CandidatePhoto candidate={selectedCandidate} photos={photos} brokenImages={brokenImages} onImageError={onImageError} compact />
            </div>
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{selectedCandidate.name}</p><p className="text-sm text-[#b8c8ea]">{selectedCandidate.city}</p></div>
          </div>
        ) : (
          <div className="rounded-[22px] border border-dashed border-white/18 bg-white/8 p-5 text-center text-sm font-medium text-[#c9d7f1] backdrop-blur-xl">Awaiting selection</div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState({});
  const [picks, setPicks] = useState({});
  const [brokenImages, setBrokenImages] = useState({});
  const [countdown, setCountdown] = useState(getCountdownTime());

  useEffect(() => {
    console.log("[MUPH Debug] Countdown initialized", { eventDate: muphEventDate.toISOString() });
    const timer = window.setInterval(() => {
      const nextCountdown = getCountdownTime();
      console.log("[MUPH Debug] Countdown tick", nextCountdown);
      setCountdown(nextCountdown);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredCandidates = useMemo(() => filterCandidates(candidates, query), [query]);
  const selectedCount = Object.values(picks).filter(Boolean).length;
  const getCandidate = (id) => candidates.find((candidate) => candidate.id === id);
  const assignTitle = (titleKey, candidateId) => setPicks((current) => getNextPicks(current, titleKey, candidateId));
  const clearTitle = (titleKey) => setPicks((current) => { const copy = { ...current }; delete copy[titleKey]; return copy; });
  const markImageAsBroken = (candidateId) => setBrokenImages((current) => ({ ...current, [candidateId]: true }));
  const handlePhotoUpload = (candidateId, event) => {
    const file = event.target.files?.[0];
    console.log("[MUPH Debug] Photo upload requested", { candidateId, fileName: file?.name });
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotos((current) => ({ ...current, [candidateId]: reader.result }));
    reader.readAsDataURL(file);
  };
  const removePhoto = (candidateId) => setPhotos((current) => { const copy = { ...current }; delete copy[candidateId]; return copy; });
  const ghostButtonClass = "rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur-xl transition hover:bg-white/12";

  return (
    <div className="min-h-screen overflow-hidden bg-[#020204] text-white [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',Arial,sans-serif]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_78%_8%,rgba(80,110,180,0.24),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,#0b0b10_0%,#030306_42%,#000000_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.10)_18%,transparent_34%,transparent_100%)]" />
      </div>

      <header className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-6">
        <div className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Website created by Tina Rasha</div>
        <nav className="mb-16 flex items-center justify-between rounded-full border border-white/15 bg-white/8 px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center"><img src={navLogo} alt="MUPH logo" className="h-11 w-11 rounded-full object-cover" /><span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#34c759] ring-2 ring-[#050507] shadow-[0_0_10px_rgba(52,199,89,0.75)]" /></div>
            <div><p className="text-sm font-semibold leading-none tracking-[-0.01em] text-white">MUPH 2026</p><p className="mt-1 text-[11px] font-medium text-white/60">Crown Prediction</p></div>
          </div>
          <div className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex"><a href="#results" className="transition hover:text-white">Board</a><a href="#candidates" className="transition hover:text-white">Candidates</a></div>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/70 ring-1 ring-white/10 backdrop-blur-xl"><span className="h-2 w-2 rounded-full bg-white" />MUPH fan ballot experience</div>
            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.065em] text-white md:text-8xl lg:text-9xl">Choose the next set of queens.</h1>
            <p className="mt-7 max-w-2xl text-lg font-normal leading-8 tracking-[-0.01em] text-white/70 md:text-xl">Pick your winner for each title. Each candidate can only hold one title at a time.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#candidates" className={ghostButtonClass}>Start Picking</a><a href="#results" className={ghostButtonClass}>View Board</a></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.08 }}>
            <div className="rounded-[32px] border border-white/18 bg-white/6 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.08)] ring-1 ring-white/12 backdrop-blur-3xl">
              <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[26px] p-8 text-white ring-1 ring-white/10" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.40)), url(${featureBackgroundImage})`, backgroundSize: "cover", backgroundPosition: "72% center" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/55" />
                <div className="relative z-10 flex items-start justify-end"><span className="rounded-full border border-white/30 bg-white/14 px-4 py-2 text-xs font-semibold text-white shadow-sm ring-1 ring-white/30 backdrop-blur-xl">Top 31</span></div>
                <div className="relative z-10 mt-auto grid grid-cols-2 gap-3 border-t border-white/20 pt-6"><div className="rounded-3xl border border-white/35 bg-white/12 p-5 shadow-sm ring-1 ring-white/30 backdrop-blur-xl"><p className="text-5xl font-semibold tracking-[-0.05em] text-white">{selectedCount}</p><p className="mt-1 text-sm font-medium text-white/70">Selected</p></div><div className="rounded-3xl border border-white/35 bg-white/12 p-5 shadow-sm ring-1 ring-white/30 backdrop-blur-xl"><p className="text-5xl font-semibold tracking-[-0.05em] text-white">7</p><p className="mt-1 text-sm font-medium text-white/70">Titles</p></div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <section className="mb-10"><div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(40,56,97,0.50)_0%,rgba(16,24,47,0.88)_100%)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-2xl md:p-7"><div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Countdown to MUPH 2026</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">May 2, 2026 · 7:00 PM</h2></div><div className="grid grid-cols-4 gap-3">{[["Days", countdown.days],["Hours", countdown.hours],["Minutes", countdown.minutes],["Seconds", countdown.seconds]].map(([label, value]) => <div key={label} className="rounded-3xl border border-white/15 bg-white/10 px-4 py-4 text-center shadow-sm ring-1 ring-white/10 backdrop-blur-xl"><p className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">{value}</p><p className="mt-1 text-xs font-medium text-white/60">{label}</p></div>)}</div></div></div></section>

        <section id="results" className="mb-20"><div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,28,78,0.72)_0%,rgba(2,12,38,0.92)_100%)] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-2xl md:p-8"><div className="relative z-10 mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#dce7ff] backdrop-blur-xl"><span className="text-base">✦</span>Crown Board</div><h2 className="mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#c8d6f5_58%,#91a7d7_100%)] bg-clip-text text-5xl font-semibold tracking-[-0.06em] text-transparent md:text-7xl">Your Crown Picks</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#cad8f4] md:text-lg">Build your dream winners list. Each candidate can only be selected once, so every title stays unique and special.</p></div><div className="grid grid-cols-2 gap-3"><div className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 shadow-sm ring-1 ring-white/10 backdrop-blur-xl"><p className="text-4xl font-semibold tracking-[-0.05em] text-white">{selectedCount}</p><p className="mt-1 text-sm font-medium text-[#c8d7f2]">Selected</p></div><div className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 shadow-sm ring-1 ring-white/10 backdrop-blur-xl"><p className="text-4xl font-semibold tracking-[-0.05em] text-white">7</p><p className="mt-1 text-sm font-medium text-[#c8d7f2]">Titles</p></div></div></div><div className="relative z-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{titles.map((title) => <TitleCard key={title.key} title={title} selectedCandidate={getCandidate(picks[title.key])} photos={photos} brokenImages={brokenImages} onImageError={markImageAsBroken} onClear={() => clearTitle(title.key)} />)}</div></div></section>

        <section id="candidates" className="rounded-[34px] border border-white/15 bg-white/8 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.06)] ring-1 ring-white/10 backdrop-blur-2xl md:p-8">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-semibold text-white/60">Official Top 31</p><h2 className="mt-2 text-5xl font-semibold tracking-[-0.055em] text-white md:text-7xl">Candidate Gallery</h2></div><div className="relative w-full max-w-md"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidate or province..." className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-11 pr-5 text-sm font-medium text-white outline-none ring-1 ring-white/10 backdrop-blur-xl placeholder:text-white/60 focus:border-[#0071e3]/40 focus:bg-white/12" /></div></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCandidates.map((candidate) => {
              const chosenTitles = titles.filter((title) => picks[title.key] === candidate.id);
              return (
                <motion.article key={candidate.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="group overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(44,44,48,0.92)_0%,rgba(16,16,18,0.98)_55%,rgba(5,5,6,1)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.45)] ring-1 ring-white/8 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_28px_90px_rgba(255,255,255,0.06)]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,#1f1f23_0%,#0d0d10_55%,#050506_100%)]"><CandidatePhoto candidate={candidate} photos={photos} brokenImages={brokenImages} onImageError={markImageAsBroken} /><div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-white/10 backdrop-blur-xl">#{candidate.id}</div><label className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-black/35 text-white shadow-sm ring-1 ring-white/10 backdrop-blur-xl transition hover:bg-white/10" title="Upload photo">↥<span className="sr-only">Upload photo for {candidate.name}</span><input type="file" accept="image/*" className="hidden" onChange={(event) => handlePhotoUpload(candidate.id, event)} /></label>{photos[candidate.id] && <button onClick={() => removePhoto(candidate.id)} className="absolute right-4 top-16 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/35 text-white shadow-sm ring-1 ring-white/10 backdrop-blur-xl transition hover:bg-white/10" title="Remove uploaded photo">×</button>}</div>
                  <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(28,28,31,0.92)_0%,rgba(10,10,12,0.98)_100%)] p-5"><p className="text-sm font-semibold text-[#b8b8c2]">{candidate.city}</p><h3 className="mt-2 min-h-[3.4rem] text-2xl font-semibold leading-7 tracking-[-0.035em] text-white">{candidate.name}</h3>{candidate.note && <p className="mt-2 text-sm leading-5 text-white/60">{candidate.note}</p>}{chosenTitles.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{chosenTitles.map((title) => <span key={title.key} className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(78,78,84,0.35)_0%,rgba(22,22,24,0.80)_100%)] px-3 py-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">{title.shortLabel}</span>)}</div>}<div className="mt-5 space-y-2">{titles.map((title) => { const isSelected = picks[title.key] === candidate.id; return <button key={title.key} onClick={() => assignTitle(title.key, candidate.id)} className={`w-full rounded-full px-4 py-2.5 text-left text-xs font-semibold transition ${isSelected ? "bg-[linear-gradient(180deg,#ffffff_0%,#d8dde8_36%,#8f98ab_62%,#f6f8ff_100%)] text-[#141822] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_30px_rgba(255,255,255,0.18)] ring-1 ring-white/50" : "border border-white/10 bg-[linear-gradient(180deg,rgba(78,78,84,0.55)_0%,rgba(34,34,38,0.88)_48%,rgba(12,12,14,0.98)_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_18px_rgba(0,0,0,0.28)] backdrop-blur-xl hover:border-white/15 hover:brightness-110"}`}>{title.shortLabel}</button>; })}</div></div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
