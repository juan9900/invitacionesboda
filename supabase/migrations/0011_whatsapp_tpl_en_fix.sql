-- Las plantillas de WhatsApp en inglés (individual, pareja, familia) se
-- habían quedado con el texto genérico corto de la migración 0010, mientras
-- que las plantillas en español fueron editadas desde el admin a un mensaje
-- más largo y personalizado. Se actualiza el inglés para que sea la
-- traducción de ese mismo mensaje. Nota: en español, individual difiere de
-- pareja/familia solo por la conjugación tú/ustedes; en inglés esa distinción
-- no existe ("you" cubre ambos casos), así que las tres plantillas en inglés
-- quedan con el mismo texto. mensaje_whatsapp_tpl_cortesia_en ya era una
-- traducción correcta y no se toca.

update public.event
set
  mensaje_whatsapp_tpl_individual_en =
    E'{nombres}\r\n\r\nThere are days in life that become unforgettable when shared with the right people. That''s why it fills us with joy to invite you to be part of such a meaningful day for us.\r\n\r\nGuided by God''s blessing and with hearts full of excitement, we will unite our lives forever. We want you by our side at the start of this new chapter.\r\n\r\nYou''ll find all the details of our wedding in the link below. We kindly ask you to confirm your attendance through that link or by replying to this message as soon as possible.\r\n\r\n{url}',
  mensaje_whatsapp_tpl_pareja_en =
    E'{nombres}\r\n\r\nThere are days in life that become unforgettable when shared with the right people. That''s why it fills us with joy to invite you to be part of such a meaningful day for us.\r\n\r\nGuided by God''s blessing and with hearts full of excitement, we will unite our lives forever. We want you by our side at the start of this new chapter.\r\n\r\nYou''ll find all the details of our wedding in the link below. We kindly ask you to confirm your attendance through that link or by replying to this message as soon as possible.\r\n\r\n{url}',
  mensaje_whatsapp_tpl_familia_en =
    E'{nombres}\r\n\r\nThere are days in life that become unforgettable when shared with the right people. That''s why it fills us with joy to invite you to be part of such a meaningful day for us.\r\n\r\nGuided by God''s blessing and with hearts full of excitement, we will unite our lives forever. We want you by our side at the start of this new chapter.\r\n\r\nYou''ll find all the details of our wedding in the link below. We kindly ask you to confirm your attendance through that link or by replying to this message as soon as possible.\r\n\r\n{url}';
