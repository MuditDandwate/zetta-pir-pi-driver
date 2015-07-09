module.exports = {
  Gpio: require('./mocks/gpio'),
  Aio: require('./mocks/aio'),
  Pwm: require('./mocks/pwm'),
  
  DIR_OUT:  0, /**< Output. A Mode can also be set */
  DIR_IN:   1,  /**< Input */

  EDGE_NONE:    0, /**< No interrupt on Gpio */
  EDGE_BOTH:    1, /**< Interupt on rising & falling */
  EDGE_RISING:  2, /**< Interupt on rising only */
  EDGE_FALLING: 3,  /**< Interupt on falling only */

  MODE_STRONG:    0, /**< Default. Strong High and Low */
  MODE_PULLUP:    1, /**< Interupt on rising & falling */
  MODE_PULLDOWN:  2, /**< Interupt on rising only */
  MODE_HIZ:       3  /**< Interupt on falling only */
};
